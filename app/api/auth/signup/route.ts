import { NextResponse } from "next/server";
import { registerUser } from "@/lib/auth-store";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, class: className, rollNo, email, password } = body;

    if (
      typeof name !== "string" ||
      typeof className !== "string" ||
      typeof rollNo !== "string" ||
      typeof email !== "string" ||
      typeof password !== "string"
    ) {
      return NextResponse.json(
        { error: "Missing or invalid fields: name, class, rollNo, email, password." },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters." },
        { status: 400 }
      );
    }

    const result = registerUser({
      name,
      class: className,
      rollNo,
      email,
      password,
    });

    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: 409 });
    }

    return NextResponse.json({ success: true, userId: result.userId });
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 }
    );
  }
}
