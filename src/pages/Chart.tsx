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

const ChartTitle = styled.h2`
  text-align: center;
  color: #fff;
  font-weight: 700;
  font-size: 1.15rem;
  margin-bottom: 1rem;
  line-height: 1.3;
  padding: 0 0.5rem;
  letter-spacing: 0.5px;
`;

const ChartContainer = styled.div`
  width: 100%;
  margin-bottom: 2rem;
`;

const DEXSCREENER_URL_BSC =
  "https://dexscreener.com/bsc/0x5a091169C79F4b18d21E4901cD7653Ef9C6c1665?embed=1&loadChartSettings=0&trades=0&tabs=0&info=0&chartDefaultOnMobile=1&chartTheme=dark&theme=dark&chartStyle=1&chartType=usd&interval=15";

const DEXSCREENER_URL_ETH =
  "https://dexscreener.com/ethereum/0xfdd05552F1377aA488AFed744c8024358AF02041?embed=1&loadChartSettings=0&trades=0&info=0&chartLeftToolbar=0&chartDefaultOnMobile=1&chartTheme=dark&theme=dark&chartStyle=0&chartType=usd&interval=15";

const DexScreenerChart = () => (
  <div id="chart" style={{ width: "100%", maxWidth: 1200, margin: "0 auto" }}>
    {/* Primeiro Chart - BSC */}
    <ChartContainer>
      <ChartTitle>Track $VMURAD LIVE on BSC!</ChartTitle>
      <DexScreenerEmbed>
        <iframe
          src={DEXSCREENER_URL_BSC}
          title="DexScreener BSC Chart"
          allowFullScreen
          loading="lazy"
        />
      </DexScreenerEmbed>
    </ChartContainer>
    
    {/* Segundo Chart - Ethereum */}
    <ChartContainer>
      <ChartTitle>Track $VISTA LIVE on Ethereum!</ChartTitle>
      <DexScreenerEmbed>
        <iframe
          src={DEXSCREENER_URL_ETH}
          title="DexScreener Ethereum Chart"
          allowFullScreen
          loading="lazy"
        />
      </DexScreenerEmbed>
    </ChartContainer>
  </div>
);

export default DexScreenerChart;
