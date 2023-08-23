import "@/styles/globals.css";
import { Metadata } from "next";
import Layout from "../components/layout/Layout";


export const metadata: Metadata = {
    title: 'NoControle',
    description: 'Bem-vindo ao NoControle',

}

export default function RootLayout({
    // Layouts must accept a children prop.
    // This will be populated with nested layouts or pages
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body>

                <Layout >

                    {children}

                </Layout>
            </body>
        </html>
    )
}