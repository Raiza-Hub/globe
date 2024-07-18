
export default function SiteFooter() {
    return (
      <footer className="py-6 md:px-8 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built by{" "}
            <a
              href='https://x.com/wisdom_adebola'
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Raiza-Hub
            </a>
            . The source code is available on{" "}
            <a
              href='https://github.com/Raiza-Hub/globe'
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              GitHub
            </a>
            .
          </p>
        </div>
      </footer>
    )
  }