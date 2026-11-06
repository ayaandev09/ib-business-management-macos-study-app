import { NextRequest, NextResponse } from "next/server";

// In-memory sync store (persisted in node runtime memory across requests)
const syncStore = new Map<
  string,
  {
    data: any;
    updatedAt: number;
  }
>();

// Clean up entries older than 24 hours periodically
function cleanupOldEntries() {
  const now = Date.now();
  const maxAge = 24 * 60 * 60 * 1000;
  for (const [key, value] of syncStore.entries()) {
    if (now - value.updatedAt > maxAge) {
      syncStore.delete(key);
    }
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { syncId, payload } = body;

    if (!syncId || !payload) {
      return NextResponse.json(
        { error: "syncId and payload are required" },
        { status: 400 }
      );
    }

    syncStore.set(syncId, {
      data: payload,
      updatedAt: Date.now(),
    });

    cleanupOldEntries();

    return NextResponse.json({
      success: true,
      syncId,
      timestamp: Date.now(),
      entriesCount: Object.keys(payload.completedTopics || {}).length,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to parse sync payload" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const syncId = searchParams.get("syncId") || searchParams.get("id");

  if (!syncId) {
    return NextResponse.json(
      { error: "syncId parameter required" },
      { status: 400 }
    );
  }

  const entry = syncStore.get(syncId);
  if (!entry) {
    return NextResponse.json(
      { error: "Sync session expired or not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    syncId,
    data: entry.data,
    updatedAt: entry.updatedAt,
  });
}
