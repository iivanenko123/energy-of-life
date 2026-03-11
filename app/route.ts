export function GET(request: Request) {
  return Response.redirect(new URL("/site", request.url), 307);
}
