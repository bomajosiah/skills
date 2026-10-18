// Nothing in this fixture should be reported: correct uses of the same slots.
export function Clean() {
  return (
    <main>
      <PageHeader title="Money" info="Approved quote value for this week." actions={<Button>Send invoice</Button>} />
      <EmptyState title="No customers yet" description="Customers appear here after their first ticket is created at the counter." action={<Button>Add customer</Button>} />
      <ConfirmAction label="Delete ticket" title="Delete SR-1042?" description="This removes the ticket and its photos and it cannot be undone later." />
      <Input label="Date of birth" hint="For example, 27 3 2007" />
      <p>No overdue invoices.</p>
      <a href="/pricing">See pricing</a>
      <button>Send quote</button>
    </main>
  );
}
