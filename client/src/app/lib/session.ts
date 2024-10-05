import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { SessionPayload } from "./definitions";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
const secretKey = process.env.SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.log("Failed to verify session");
  }
}

export async function createSession(payload: SessionPayload) {
  const { user, token } = payload;
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const session = token? await encrypt({ user, expiresAt, token }): await encrypt({ user, expiresAt });

  cookies().set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

// export async function updateSession(req: NextRequest) {
//   const session = req.cookies.get("session")?.value;

//   if (!session) {
//     return null;
//   }
//   const payload = await decrypt(session);
//   if (!payload) {
//     console.log("Invalid session");
//     return null;
//   }
//   const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

//   const newSession = await encrypt({ ...payload, expiresAt } as any);
//   const res = NextResponse.next();
//   res.cookies.set("session", newSession, {
//     httpOnly: true,
//     secure: true,
//     expires: expiresAt,
//     sameSite: "lax",
//     path: "/",
//   });
//   return res;
// }


export async function updateSession(request?: NextRequest) {
  let sessionCookie;
  let response;

  if (request) {
    // Middleware context
    sessionCookie = request.cookies.get('session')?.value;
    response = NextResponse.next();
  } else {
    // Server action or component context
    sessionCookie = cookies().get('session')?.value;
    response = undefined; // No need to return a response
  }

  if (!sessionCookie) {
    return response;
  }

  const payload = await decrypt(sessionCookie);
  if (!payload) {
    console.log('Invalid session');
    return response;
  }

  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const newSession = await encrypt({ ...payload, expiresAt } as any);

  if (request) {
    // Middleware context
    response?.cookies.set('session', newSession, {
      httpOnly: true,
      secure: true,
      expires: expiresAt,
      sameSite: 'lax',
      path: '/',
    });
    return response;
  } else {
    // Server action or component context
    cookies().set('session', newSession, {
      httpOnly: true,
      secure: true,
      expires: expiresAt,
      sameSite: 'lax',
      path: '/',
    });
  }
}
export async function deleteSession() {
  cookies().delete("session");
}

export async function getSession(request?: NextRequest) {
  let sessionCookie;

  if (request) {
    // We're in middleware or have a request object
    sessionCookie = request.cookies.get('session')?.value;
  } else {
    // We're in a server component or server action
    sessionCookie = cookies().get('session')?.value;
  }

  if (!sessionCookie) return null;
  return await decrypt(sessionCookie);
}

