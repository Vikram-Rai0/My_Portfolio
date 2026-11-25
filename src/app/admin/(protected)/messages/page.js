import { db } from "@/lib/db";
import ConfirmButton from "@/components/admin/ConfirmButton";
import { deleteMessage, toggleMessageRead } from "../../actions";

export const metadata = { title: "Messages — Admin" };

const formatter = new Intl.DateTimeFormat("en", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "UTC",
});

export default async function MessagesPage() {
  const messages = await db.message.findMany({
    orderBy: { createdAt: "desc" },
    take: 200,
  });

  return (
    <>
      <h1 className="mb-8 text-2xl font-extrabold text-ink">Messages</h1>

      {messages.length === 0 ? (
        <p className="text-[15px] text-ink-soft">No messages yet.</p>
      ) : (
        <ul className="space-y-4">
          {messages.map((message) => (
            <li
              key={message.id}
              className={`rounded-2xl border p-5 ${message.read ? "border-line" : "border-forest/50 bg-paper-sage"}`}
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="text-[15px] font-semibold text-ink">
                  {message.name}{" "}
                  <a href={`mailto:${message.email}`} className="font-normal text-forest underline underline-offset-4">
                    {message.email}
                  </a>
                </p>
                <p className="font-mono text-[11px] text-ink-muted">{formatter.format(message.createdAt)} UTC</p>
              </div>

              <p className="mt-3 whitespace-pre-wrap break-words text-[14px] leading-relaxed text-ink-soft">
                {message.body}
              </p>

              <div className="mt-4 flex items-center gap-5">
                <form action={toggleMessageRead}>
                  <input type="hidden" name="id" value={message.id} />
                  <input type="hidden" name="read" value={String(!message.read)} />
                  <button type="submit" className="font-mono text-[11px] uppercase tracking-wide text-forest hover:text-ink">
                    Mark as {message.read ? "unread" : "read"}
                  </button>
                </form>
                <form action={deleteMessage}>
                  <input type="hidden" name="id" value={message.id} />
                  <ConfirmButton message="Delete this message?" className="font-mono text-[11px] uppercase tracking-wide text-ink-muted hover:text-ink">
                    Delete
                  </ConfirmButton>
                </form>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
