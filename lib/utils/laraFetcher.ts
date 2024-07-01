// import { redirect } from "@remix-run/node";
// import { authCookie } from "@/auth";

type laraFetchOptions = {
  method?: string;
  body?: FormData | Record<string, any>;
};

export const CSRF_COOKIE = 'XSRF-TOKEN',
  CSRF_HEADER = 'X-XSRF-TOKEN';

export default async function laraFetch<T>(
  path: RequestInfo,
  { method = 'get', body: requestBody }: laraFetchOptions,
  request?: Request
): Promise<T> {
  const { BE_URL } = process.env;
  const isMutation = ['post', 'put', 'patch', 'delete'].includes(
    method.toLowerCase()
  );

  let token: string | null = null;
  let cookieHeader = request?.headers.get('Cookie');

  if (cookieHeader) {
    // const cookies = await authCookie.parse(cookieHeader);

    // token = cookies[CSRF_HEADER];
    // cookieHeader = cookies.Cookie;
  }

  if (isMutation && !cookieHeader) {
    const responseCsrf = await fetch(`${BE_URL}/sanctum/csrf-cookie`, {
      method: 'GET',
    });
    const cookies = String(responseCsrf.headers.get('set-cookie'));
    const laravelCookies = await parseCookie(cookies);

    token = laravelCookies.XSRFToken;
    cookieHeader = `laravel_session=${laravelCookies.laravelSession}; ${CSRF_COOKIE}=${token}`;
  }

  const headers = new Headers({
    accept: 'application/json',
    Referer: 'http://localhost:3000',
  });

  if (token && cookieHeader) {
    headers.set('Cookie', cookieHeader);
    headers.set(CSRF_HEADER, token);
  }

  let body = undefined;

  if (requestBody instanceof FormData) {
    headers.set('Content-Type', 'application/json');
    body = JSON.stringify(Object.fromEntries(requestBody));
  }

  const response = await fetch(`${BE_URL}${path}`, {
    headers,
    method: method.toUpperCase(),
    body,
  });

  if ([500, 502, 503, 504, 505].includes(response.status)) {
    throw new Error(`Laravel server error! Status: ${response.statusText}`);
  }

  return response as T;
}


export async function laraReq<T, K = Response>(
  fetchable: Promise<T>,
  onSuccess?: (param?: Response),
  onUnauthorized?: (param?: Response) => K
): Promise<{ data: T | null; errors: Record<string, string[]> | null }> {
  const response = await fetchable;

  if (!(response instanceof Response)) {
    throw new Error("Something went wrong");
  }

  if (response.status === 419) {
    // throw redirect("/login", {
    //   headers: {
    //     "Set-Cookie": await authCookie.serialize("", { maxAge: 0 }),
    //   },
    // });
  }

  if (response.status === 401) {
    await onUnauthorized?.(response);
  }

  let data: T | null = null;
  let errors: Record<string, string[]> | null = null;

  if ([422, 200].includes(response.status)) {
    const json = await response.json();

    if (response.status === 422) {
      errors = json.errors;
    } else {
      data = json;
    }
  }

  await onSuccess?.(response);

  return { data, errors };
}

export async function parseCookie(setCookie: string): Promise<{
  XSRFToken: string;
  laravelSession: string;
}> {
  let XSRFToken = "",
    laravelSession = "",
    cookies = setCookie.split(",");

  for (let index = 0; index < cookies.length; index++) {
    let cookie = cookies[index];

    if (cookie.includes(CSRF_COOKIE)) {
      XSRFToken = await getCookie(CSRF_COOKIE, cookie);
    }

    if (cookie.includes("laravel_session")) {
      laravelSession = await getCookie("laravel_session", cookie.split(";")[0]);
    }
  }

  return {
    XSRFToken,
    laravelSession,
  };
}

async function getCookie(name: string, cookieString: string): Promise<string> {
  if (name === "laravel_session") {
    return decodeURIComponent(cookieString.split("=")[1]);
  }

  let match = cookieString.match(new RegExp("(^|;\\s*)(" + name + ")=([^;]*)"));

  return match ? decodeURIComponent(match[3]) : "";
}