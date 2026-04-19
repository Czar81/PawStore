import { useState } from 'react';
import FormContact from '@/components/forms/FormContact';

function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <main className="page-generic">
      <section className="section-form">
        <h2>Contact</h2>
        <p className="form-subtitle">
          Have a question? Write to us and we will respond as soon as possible.
        </p>

        {sent && (
          <p className="contact-success">
            Message sent! We will contact you soon.
          </p>
        )}

        <FormContact onSuccess={() => setSent(true)} />
      </section>
    </main>
  );
}

export default ContactPage;