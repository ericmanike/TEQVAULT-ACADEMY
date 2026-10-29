import Image from "next/image";

export default function Loading() {
  return (
    <main className="site-loader" aria-label="Loading TEQVAULT Academy">
      <div className="site-loader-content">
        <div className="site-loader-mark">
          <Image
            className="site-loader-image"
            src="/favicon.ico"
            alt=""
            width={48}
            height={48}
            priority
          />
        </div>
        <p className="site-loader-label">Loading</p>
      </div>
    </main>
  );
}
