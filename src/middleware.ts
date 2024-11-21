import { NextResponse, NextRequest } from "next/server";
import { getDB } from "@/server/models/index";

export function middleware(request: NextRequest) {
  getDB().sequelize.sync();
  return NextResponse.next(request);
}
