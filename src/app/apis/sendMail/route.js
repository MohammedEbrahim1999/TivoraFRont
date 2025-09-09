import { Resend } from "resend";

const resend = new Resend("re_fiUmx5Vd_26iQicdg9UVRgBvgLXmtCAcJ");

export async function POST(req) {
    try {
        const { name,phone, email, message } = await req.json();

        await resend.emails.send({
            from: "onboarding@resend.dev", // can be changed to your domain later
            to: "mohammed.ebrahim9921@gmail.com",
            subject: "New Contact Form TIVORA Client",
            html: `
        <h1 style="color: red;">New Message from TIVORA Contact</h1>
        <h1 style="color: red;">Name:</> ${name}</h1>
        <h1 style="color: red;">Phone:</> ${phone}</h1>
        <h1 style="color: red;">Email:</> ${email}</h1>
        <h1 style="color: red;">Message:</> ${message}</h1>
      `,
        });

        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
    }
}
