import Link from 'next/link';

export default function Home() {
  return (
    <div className="container">
      <h1>Airwallex Payment Demo - Next.js with TS</h1>
      <div className="links">
        <Link href="/hpp">
          <button>Hpp</button>
        </Link>
        <Link href="/dropin">
          <button>DropIn</button>
        </Link>
        <Link href="/full-featured-card">
          <button>Full Featured Card</button>
        </Link>
        <Link href="/split-card">
          <button>Split Card</button>
        </Link>
        <Link href="/wechat">
          <button>Wechat</button>
        </Link>
        <Link href="/card">
          <button>Card</button>
        </Link>
        <Link href="/redirect">
          <button>Redirect</button>
        </Link>
      </div>
    </div>
  );
}
