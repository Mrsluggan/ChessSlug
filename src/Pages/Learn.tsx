import React from 'react';

export default function Learn() {
  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto',fontSize: '20px' }}>
      <h1>Hur man spelar schack</h1>
      
      <section>
        <h2>Introduktion</h2>
        <p>Schack är ett strategispel för två spelare där målet är att sätta motståndarens kung i schackmatt, vilket betyder att kungen är hotad och inte kan fly utan att bli fångad.</p>
      </section>
      
      <section>
        <h2>Regler och målet med spelet</h2>
        <p>Spelet spelas på ett bräde med 64 rutor, fördelade i 8x8 rader och kolumner. Varje spelare börjar med 16 pjäser: en kung, en drottning, två torn, två löpare, två hästar och åtta bönder. Vit börjar alltid, och spelarna turas om att göra drag.</p>
      </section>

      <section>
        <h2>Pjäsernas rörelser</h2>
        <ul>
          <li><strong>Kungen:</strong> Kan flytta ett steg i valfri riktning.</li>
          <li><strong>Drottningen:</strong> Kan röra sig valfritt antal steg i alla riktningar (horisontellt, vertikalt eller diagonalt).</li>
          <li><strong>Tornet:</strong> Rör sig valfritt antal steg horisontellt eller vertikalt.</li>
          <li><strong>Löparen:</strong> Kan röra sig valfritt antal steg diagonalt.</li>
          <li><strong>Hästen:</strong> Rör sig i ett "L"-mönster: två steg i en riktning och ett steg åt sidan. Den kan hoppa över andra pjäser.</li>
          <li><strong>Bönder:</strong> Flyttar ett steg framåt (två steg från startposition) och tar diagonalt.</li>
        </ul>
      </section>

      <section>
        <h2>Grundläggande strategitips</h2>
        <ul>
          <li><strong>Kontrollera centrum:</strong> Försök att kontrollera brädets mitt med dina pjäser för att ha större rörelsefrihet.</li>
          <li><strong>Utveckla pjäserna:</strong> Flytta ut dina springare och löpare tidigt för att få kontroll över fler rutor.</li>
          <li><strong>Skydda kungen:</strong> Gör rockad tidigt för att placera kungen säkert bakom bönder.</li>
        </ul>
      </section>
      
      <section>
        <h2>Att sätta schackmatt</h2>
        <p>Spelet avslutas när en spelare sätter motståndarens kung i schackmatt. Detta händer när kungen är hotad och inte har några lagliga drag kvar som kan undvika hotet.</p>
      </section>
    </div>
  );
}
