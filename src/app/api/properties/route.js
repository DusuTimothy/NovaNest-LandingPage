import { NextResponse } from "next/server";
import { getPropertiesData } from "@/lib/api";

export async function GET() {
  try {
    const data = await getPropertiesData();
    return NextResponse.json(data);
  } catch (error) {
    console.error("API route error:", error);
    return NextResponse.json(
      { error: "Failed to fetch property listings" },
      { status: 500 }
    );
  }
}
