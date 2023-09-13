import Image from "next/image";

export default function Home() {
  return (
    <header className="site-section page-hero">
      <div className="wrapper">
        <div className="page-hero__text-cont">
          <h1 className="page-hero__caption">
            Get started with sign doc, a modern signing platform for your
            documents.
          </h1>
          <p className="page-hero__description">
            Sign doc is a modern signing platform powered by AI and the Dropbox
            Sign API for your documents. Sign doc is an innovative solution that
            allows you to sign documents online with legally binding signatures.
          </p>
          <button className="cta">Get started for free</button>
        </div>
      </div>
    </header>
  );
}
