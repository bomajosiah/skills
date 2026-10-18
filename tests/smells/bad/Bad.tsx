// Every rule should fire at least once in this fixture.
export function Bad() {
  return (
    <main>
      <Card title="Sign in" eyebrow="Your view only" />
      <Card title="Money" eyebrow="The till, the invoices, and what has gone quiet" />
      <Section title="Week to date" description="Approved quote value. Settled revenue comes from the payment platform once that integration is live." />
      <span style={{ textTransform: "uppercase", letterSpacing: "0.1em", color: "#5b6577" }}>Load in minutes, not headcount</span>
      <p>Each person sees only their own work.</p>
      <p>Where you land is decided by your account.</p>
      <p>Workload over the window. Not a ranking.</p>
      <p>Newest first, held messages included</p>
      <p>Here you can manage every repair in one place.</p>
      <p>Certainly! Here is your summary.</p>
      <p>Seamlessly track every job from intake to pickup.</p>
      <p>Oops</p>
      <button>Submit</button>
      <a href="/pricing">See pricing →</a>
      <p>Tickets are ready 🎉 today</p>
    </main>
  );
}
