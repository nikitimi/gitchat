import { NextRequest, NextResponse } from "next/server";
// create user.
export async function POST(request: NextRequest) {
  const { email, username, password } = await request.json();

  try {
    const result = await User.createNewUser(email, username, password);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}
