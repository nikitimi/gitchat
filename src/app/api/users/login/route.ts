import { NextRequest, NextResponse } from "next/server";

// login user.
export async function POST(request: NextRequest) {
  try {
    const result = await User.loginUser(await request.json());
    return NextResponse.json(result);
  } catch (error) {
    NextResponse.json(error, { status: 400 });
  }
}
