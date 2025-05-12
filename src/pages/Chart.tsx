import styled from "styled-components";

const DexScreenerEmbed = styled.div`
  width: 100%;
  padding: 1.5rem 0.5rem;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;

  /* Proporção vertical maior no mobile para melhor visualização */
  aspect-ratio: 16 / 22;

  @media (min-width: 600px) {
    aspect-ratio: 16 / 10;
    padding: 1.5rem 2rem;
  }

  @media (min-width: 1024px) {
    aspect-ratio: 16 / 7;
    padding: 1.5rem 8rem;
  }

  @media (min-width: 1400px) {
    aspect-ratio: 16 / 6;
    padding: 0.5rem 0.5rem;
  }

  iframe {
    width: 100%;
    height: 100%;
    border: 0;
    border-radius: 12px;
    background: transparent;
    box-shadow: 0 2px 8px rgba(0,0,0,0.07);
  }
`;

const DEXSCREENER_URL =
  "https://dexscreener.com/bsc/0x5a091169C79F4b18d21E4901cD7653Ef9C6c1665?embed=1&loadChartSettings=0&trades=0&tabs=0&info=0&chartDefaultOnMobile=1&chartTheme=dark&theme=dark&chartStyle=1&chartType=usd&interval=15";

const DexScreenerChart = () => (
  <div id="chart" style={{ width: "100%", maxWidth: 1200, margin: "0 auto" }}>
    <h2 style={{
      textAlign: "center",
      color: "#fff",
      fontWeight: 700,
      fontSize: "1.15rem",
      marginBottom: "1rem",
      lineHeight: 1.3,
      padding: "0 0.5rem",
      letterSpacing: 0.5,
    }}>
      Want to track your investment in real time?
    </h2>
    <DexScreenerEmbed>
      <iframe
        src={DEXSCREENER_URL}
        title="DexScreener Chart"
        allowFullScreen
        loading="lazy"
      />
    </DexScreenerEmbed>
  </div>
);

export default DexScreenerChart;
