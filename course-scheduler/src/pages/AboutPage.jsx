function AboutPage() {
    const currentDate = new Date().toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    });

    return (
        <main className="about-page">
            <section className="about-card">
                <h1>About</h1>

                <p className="about-description">
                    The Aurora CS Course Scheduler shows the CS Developer Track
                    catalog, tracks which courses you have completed, and shows
                    which courses you are eligible to take next.
                </p>

                <table className="about-table">
                    <tbody>
                    <tr>
                        <td className = "about-section"><strong>Author(s)</strong></td>
                        <td className = "about-data" >Ismael Barrera &amp; Partner Two</td>
                    </tr>

                    <tr>
                        <td className = "about-section"><strong>Date</strong></td>
                        <td className = "about-data">{currentDate}</td>
                    </tr>

                    <tr>
                        <td className = "about-section"><strong>Version</strong></td>
                        <td className = "about-data">1.0.0</td>
                    </tr>
                    </tbody>
                </table>
            </section>
        </main>
    );
}

export default AboutPage;