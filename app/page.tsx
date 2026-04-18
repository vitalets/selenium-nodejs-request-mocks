import Link from "next/link";

export default function Page() {
  return (
    <>
      <h1>Hello, SeleniumConf 2026!</h1>
      <ul>
        <li>
          <Link href="/client-side-api-call">Page with client-side API call</Link>
        </li>
        <li>
          <Link href="/server-side-api-call">Page with server-side API call</Link>
        </li>
      </ul>
    </>
  );
}
