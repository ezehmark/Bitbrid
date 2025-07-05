import { useState, useEffect, useRef, useCallback } from "react";
import "./home.css";
import "./sampleCoin.css";

import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { analytics } from "./firebase.ts";
import { useNavigate } from "react-router-dom";
import { logEvent } from "firebase/analytics";
import FeatureBox from "./featureBox.tsx";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  TimeScale,
  Title,
  Filler,
} from "chart.js";
import "chartjs-adapter-date-fns";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  TimeScale,
  Title,
  Filler,
);

function Home({
  toggleProfile,
  day,
  toggleDay,
  toggleMenu,
}: {
  toggleMenu: () => void;
  toggleDay: () => void;
  day: boolean;
  toggleProfile: () => void;
}) {
  const topRef = useRef<HTMLDivElement>(null);
  const button2Ref = useRef<HTMLDivElement>(null);
  const [total, setTotal] = useState("1300450");
  const [btc, setBtc] = useState("900000");
  const [eth, setEth] = useState("300000");
  const [sol, setSol] = useState("250000");

  const [name, setName] = useState("null_user");
  const [picUrl, setPicUrl] = useState("");

  const hof1 = useRef(null);
  const hof2 = useRef(null);
  const hof3 = useRef(null);
  const hof4 = useRef(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      hof1.current.classList.add("hof1AnimClass");
    }, 2000);

    setTimeout(() => {
      hof2.current.classList.add("show");
    }, 3500);

    setTimeout(() => {
      hof3.current.classList.add("show");
    }, 2500);

    setTimeout(() => {
      hof4.current.classList.add("show");
    }, 3000);
  }, []);

  const [text, setText] = useState(
    "The speed of blockchain transactions and the ultimate safety of banking, all built together to empower you with the ease and confidence of trading your choice cryptocurrencies anywhere, anytime from Bitbanker. Ready to explore and trade?",
  );

  const [speed, setSpeed] = useState(300);
  const [typedText, setTypedText] = useState("");

  const [autoType, setAutoType] = useState(false);
  function toggleAutoType() {
    setAutoType((a) => !a);
  }

  useEffect(() => {
    let index = 0;
    let typeInterval;

    const typer = () => {
      typeInterval = setInterval(() => {
        setTypedText((now) => now + text.charAt(index));
        index += 1;
        if (index >= text.length) {
          clearInterval(typeInterval);
        }
      }, speed);
      return () => clearInterval(typeInterval);
    };
    typer();
  }, [text, speed]);

  const navigate = useNavigate();
  const cryptoBoxRef = useRef(null);
  const boxTitleRef = useRef(null);

  const pressedTime = useRef(null);

  useEffect(() => {
    const longPress = (e) => {
      e.preventDefault();
      if (pressedTime.current) {
        clearTimeout(pressedTime.current);
      }
      pressedTime.current = setTimeout(() => {
        toggleAutoType();
      }, 4000);
    };

    const cancelLongPress = () => {
      if (pressedTime.current) {
        clearTimeout(pressedTime.current);
      }
    };

    if (cryptoBoxRef.current) {
      cryptoBoxRef.current.addEventListener("touchstart", longPress);
      cryptoBoxRef.current.addEventListener("touchend", cancelLongPress);
    }

    return () => {
      if (cryptoBoxRef.current) {
        cryptoBoxRef.current.removeEventListener("touchstart", longPress);
        cryptoBoxRef.current.removeEventListener("touchend", cancelLongPress);
      }
    };
  }, [toggleAutoType]);

  const breakpoint = 768;

  const [isMobile, setIsMobile] = useState(window.innerWidth < breakpoint);

  const [scrollOpacity1, setScrollOpacity1] = useState(0);
  const [scrollOpacity2, setScrollOpacity2] = useState(0);
  const [scrollOpacity3, setScrollOpacity3] = useState(0);
  const [scrollOpacity4, setScrollOpacity4] = useState(0);

  const maxScroll1 = 30;
  const maxScroll2 = 90;
  const maxScroll3 = 400;

  useEffect(() => {
    cryptoBoxRef.current.classList.add("cryptoAnimClass");
    boxTitleRef.current.classList.add("boxTitleAnimClass");
  }, []);

  const boxText = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollOpacity2 < 1) {
        const scrollY = window.scrollY;
        setScrollOpacity2(Math.min(1, scrollY / maxScroll2));
      }
      if (scrollOpacity2 === 1) {
        boxText.current.classList.add("boxTextAnim");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollOpacity2]);

  const [scrollVisible, setScrollVisible] = useState(0);
  const [boxVisibility, setBoxVisibility] = useState("hidden");

  const tickerBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const maxScroll = 350;

    function handleScroll() {
      if (tickerBoxRef.current && scrollVisible < 1) {
        const scrollValue = window.scrollY;
        const newScroll = Math.min(1, scrollValue / maxScroll);
        setScrollVisible(newScroll);
      }

      if (scrollVisible == 1) {
        tickerBoxRef.current.classList.add("boxAnimClass");
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollVisible]);
  useEffect(() => {
    const handleScreenSize = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    window.addEventListener("resize", handleScreenSize);
    return () => window.removeEventListener("resize", handleScreenSize);
  }, []);

  const login2Ref = useRef(null);
  useEffect(() => {
    const maxiScroll = 300;
    const handleButtonScroll = () => {
      if (scrollOpacity3 < 1) {
        const scrollValue = window.scrollY;

        setScrollOpacity3(Math.min(1, scrollValue / maxiScroll));
      }
      if (scrollOpacity3 == 1) {
        login2Ref.current.classList.add("login2AnimClass");
      }
    };

    window.addEventListener("scroll", handleButtonScroll);
    return () => window.removeEventListener("scroll", handleButtonScroll);
  }, [scrollOpacity3]);

  const arrowRef = useRef(null);
  const loginRef = useRef(null);
  const triggerLoginHover = (e) => {
    if (loginRef.current && loginRef.current.contains(e.target as Node)) {
      arrowRef.current.classList.add(arrowAnim);
    }
  };

  useEffect(() => {
    document.addEventListener("pointerenter", triggerLoginHover);
    return () =>
      document.removeEventListener("pointerenter", triggerLoginHover);
  }, []);

  const coinLogoRefs = useRef({});

  const controlCoinLogo = (e) => {
    Object.values(coinLogoRefs.current).forEach((cl) => {
      if (cl.contains(e.target as Node)) {
        cl.classList.remove("coinLogoAnimClass");
        void cl.offsetWidth;
        cl.classList.add("coinLogoAnimClass");
      }
    });
  };

  //Function to scroll the coin boxes

  const sampleContainer = useRef(null);
  const coinBox = useRef(null);
  const scrollBoxes = (direction) => {
    const scrollWidth = coinBox.current.offsetWidth;
    const scrollDistance = direction === "next" ? scrollWidth : -scrollWidth;

    sampleContainer.current.scrollBy({
      left: scrollDistance,
      behaviour: "smooth",
    });
  };

  useEffect(() => {
    document.addEventListener("click", controlCoinLogo);
    return () => document.removeEventListener("click", controlCoinLogo);
  }, []);

  const initParticles = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  const containerRef = useRef(null);
  useEffect(() => {
    const container = containerRef.current;
    const boxes = container.querySelectorAll(".coinBox");

    const myObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("coinBoxAnimClass");
          } else {
            entry.target.classList.remove("coinBoxAnimClass");
          }
        });
      },
      { root: container, threshold: 1 },
    );

    boxes.forEach((box) => myObserver.observe(box));
    return () => myObserver.disconnect();
  }, []);

  const nextRef = useRef(null);

  function moveForth(e) {
    if (nextRef.contains(e.target as Node)) {
      const scrollWidth = 300;

      containerRef.current.scrollX = scrollWidth;
    }
  }

  useEffect(() => {
    document.addEventListener("click", moveForth);

    return () => document.removeEventListener("click", moveForth);
  }, []);

  const coinTitle = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll4 = 800;
      if (scrollOpacity4 < 1) {
        const scrollY = window.scrollY;
        setScrollOpacity4(Math.min(1, scrollY / maxScroll4));
      }
      if (!isMobile) {
        setTimeout(() => {
          coinTitle.current.classList.add("coinTitleAnim");
        }, 2000);
      }
      if (scrollOpacity4 === 1) {
        cryptoBoxRef.current.classList.add("coinTitleAnim");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollOpacity4]);

  const particlesOption = {
    fullScreen: { enable: false },
    background: {
      color: "transparent", // or any background color
    },
    fpsLimit: 60,
    interactivity: {
      events: {
        onClick: { enable: true, mode: "grab" },
        onHover: { enable: true, mode: "repulse" },
        resize: true,
      },
      modes: {
        push: { quantity: 0 },
        repulse: { distance: 100, duration: 0.5 },
      },
    },
    particles: {
      color: { value: !day ? "#feb819" : "#213547" },
      links: {
        color: "#d50204",
        distance: 100,
        enable: true,
        opacity: 0.2,
        width: isMobile ? 0.3 : 1,
      },
      collisions: { enable: true },
      move: {
        direction: "none",
        enable: true,
        outModes: { default: "bounce" },
        random: false,
        speed: 0.9,
        straight: false,
      },
      number: {
        density: { enable: false, area: 800 },
        value: 20,
      },
      opacity: { value: 0.8 },
      shape: { type: "circle" }, // You can also use: "square", "polygon", "star", "image", etc.
      size: { value: { min: 1, max: 5 } },
    },
    detectRetina: true,
  };

  useEffect(() => {
    const storedName = localStorage.getItem("fullName");
    const savedPicURL = localStorage.getItem("picURL");

    setName(storedName !== null ? storedName : "");
    setPicUrl(savedPicURL !== null ? savedPicURL : "");
  }, []);

  const [btcPrice, setBtcPrice] = useState<string | null>(null);
  const [ethPrice, setEthPrice] = useState<string | null>(null);
  const [solPrice, setSolPrice] = useState<string | null>(null);
  const [dogePrice, setDogePrice] = useState<string | null>(null);
  const [linkPrice, setLinkPrice] = useState(null);
  const [adaPrice, setAdaPrice] = useState(null);
  const [xrpPrice, setXrpPrice] = useState(null);

  const btcPriceRef = useRef<string | null>(null);
  const ethPriceRef = useRef<string | null>(null);
  const solPriceRef = useRef<string | null>(null);
  const dogePriceRef = useRef<string | null>(null);
  const linkPriceRef = useRef(null);
  const adaPriceRef = useRef(null);
  const xrpPriceRef = useRef(null);

  const [btcColor, setBtcColor] = useState("white");
  const [ethColor, setEthColor] = useState("white");
  const [solColor, setSolColor] = useState("white");
  const [dogeColor, setDogeColor] = useState("white");
  const [linkColor, setLinkColor] = useState("white");
  const [adaColor, setAdaColor] = useState("white");
  const [xrpColor, setXrpColor] = useState("white");

  useEffect(() => {
    logEvent(analytics, "Screen_Views", { screen: "home" });
  }, []);

  useEffect(() => {
    let myWs: WebSocket;
    let updateTimeout: ReturnType<typeof setTimeout>;

    const updatePrices = () => {
      myWs = new WebSocket("wss://stream.bybitglobal.com/v5/public/spot");

      myWs.onopen = () => {
        myWs.send(
          JSON.stringify({
            op: "subscribe",
            args: [
              "publicTrade.BTCUSDT",
              "publicTrade.ETHUSDT",
              "publicTrade.SOLUSDT",
              "publicTrade.DOGEUSDT",
              "publicTrade.XRPUSDT",
              "publicTrade.ADAUSDT",
              "publicTrade.LINKUSDT",
              "publicTrade.XRPUSDT",
            ],
          }),
        );
      };

      myWs.onmessage = (info) => {
        const myData = JSON.parse(info.data);

        if (myData.topic?.startsWith("publicTrade") && myData.data.length > 0) {
          const symbol = myData.topic.split(".")[1];
          const price = myData.data[0].p;

          console.log("Websocket connected, prices and symbols are fetched");

          let totalBtc = 0;
          let totalEth = 0;
          let totalSol = 0;
          if (symbol === "BTCUSDT") {
            const prev = btcPriceRef.current
              ? parseFloat(btcPriceRef.current)
              : 0;
            const currentP = parseFloat(price);
            if (currentP < prev) setBtcColor("#ec5300");
            else if (currentP > prev) setBtcColor("#feb819");
            else {
              setBtcColor("grey");
            }
            btcPriceRef.current = price;
            setBtcPrice(price);
            totalBtc = Number(price) * 12;
            setBtc(totalBtc.toString());
          }

          if (symbol == "DOGEUSDT") {
            const prev = dogePriceRef.current
              ? parseFloat(dogePriceRef.current)
              : 0;
            const currentP = parseFloat(price);
            if (prev < currentP) {
              setDogeColor("#feb819");
            } else if (prev > currentP) {
              setDogeColor("#ec5300");
            } else {
              setDogeColor("grey");
            }

            dogePriceRef.current = price;
            setDogePrice(price);
          }

          if (symbol === "ETHUSDT") {
            const prev = ethPriceRef.current
              ? parseFloat(ethPriceRef.current)
              : 0;
            const currentP = parseFloat(price);
            if (currentP > prev) {
              setEthColor("#feb819");
            } else if (currentP < prev) {
              setEthColor("#ec5300");
            } else {
              setEthColor("grey");
            }

            setEthPrice(price);
            ethPriceRef.current = price;

            totalEth = Number(price) * 12;
            setEth(totalEth.toString());
          }

          if (symbol === "SOLUSDT") {
            const prev = solPriceRef.current
              ? parseFloat(solPriceRef.current)
              : 0;
            const currentP = parseFloat(price);
            if (currentP > prev) {
              setSolColor("#feb819");
            } else if (currentP < prev) {
              setSolColor("#ec5300");
            } else {
              setSolColor("grey");
            }
            setSolPrice(price);
            solPriceRef.current = price;
            totalSol = Number(price) * 12;
            setSol(totalSol.toString());
          }

          if (symbol === "LINKUSDT") {
            const prev = linkPriceRef.current
              ? parseFloat(linkPriceRef.current)
              : 0;
            const newPrice = parseFloat(price);
            if (price > prev) {
              setLinkColor("#feb819");
            } else if (prev > price) {
              setLinkColor("#ec5300");
            } else {
              setLinkColor("grey");
            }

            setLinkPrice(price);
            linkPriceRef.current = price;
          }

          if (symbol === "ADAUSDT") {
            const prev = adaPriceRef.current
              ? parseFloat(adaPriceRef.current)
              : 0;
            const newPrice = parseFloat(price);
            if (price > prev) {
              setAdaColor("#feb819");
            } else if (prev > price) {
              setAdaColor("#ec5300");
            } else {
              setAdaColor("grey");
            }
            setAdaPrice(price);
            adaPriceRef.current = price;
          }

          if (symbol === "XRPUSDT") {
            const prev = xrpPriceRef.current
              ? parseFloat(xrpPriceRef.current)
              : 0;
            const newPrice = parseFloat(price);
            if (price > prev) {
              setXrpColor("#feb819");
            } else if (prev > price) {
              setXrpColor("#ec5300");
            } else {
              setXrpColor("grey");
            }
            setXrpPrice(price);
            xrpPrice.current = price;
          }

          //Calculating prices of thw wallet coins

          const btcVal = btcPriceRef.current
            ? parseFloat(btcPriceRef.current) * 12
            : 0;
          const ethVal = ethPriceRef.current
            ? parseFloat(ethPriceRef.current) * 120
            : 0;
          const solVal = solPriceRef.current
            ? parseFloat(solPriceRef.current) * 500
            : 0;
          const totalValue = btcVal + ethVal + solVal;
          setTotal(totalValue.toString());
        }
      };

      myWs.onclose = () => {
        console.warn("WebSocket disconnected. Reconnecting in 4s...");
        updateTimeout = setTimeout(updatePrices, 4000);
      };

      myWs.onerror = () => {
        myWs.close(); // trigger reconnect
      };
    };
    updatePrices();

    return () => {
      if (myWs) myWs.close();
      if (updateTimeout) clearTimeout(updateTimeout);
    };
  }, []);

  const [loading, setLoading] = useState(false);
  const [btcChartData, setBtcChartData] = useState(null);
  async function getChartData() {
    setLoading(true);
    console.warn("effect triggered!");

    try {
      const response = await axios.get(
        "https://mybackend-oftz.onrender.com/coingecko/charts",
      );
      console.log(response.data);
      const chartData = response.data;
      console.warn(chartData);
      const priceData = chartData.prices.map((p) => ({
        x: new Date(p[0]),
        y: p[1],
      }));

      setBtcChartData({
        datasets: [
          {
            data: priceData,
            backgroundColor: "red",
            borderWidth: 0.8,
            borderColor: "orange",
            fill: false,
            tension: 0.2,
            pointRadius: 0.1,
          },
        ],
      });
    } catch (error) {
      console.log(error.response.data.error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setInterval(() => {
      getChartData();
    }, 4000);
  }, []);

  const chartOptions = {
    responsive: true,
    scales: {
      x: {
        type: "time",
        time: { unit: "day" },
        title: { display: true, text: "Date" },
      },
      y: {
        title: { display: "true", text: "BTC price" },
      },
    },

    plugins: {
      title: { display: false, text: "7-Day Bitcoin price chart live" },
    },
  };

  const chartOptions2 = {
    responsive: false,
    maintainAspectRatio: false,

    scales: {
      x: {
        display: false,
        type: "time",
        time: { unit: "day" },
        title: { display: false, text: "Date" },
      },
      y: {
        display: false,
        title: { display: false, text: "BTC price" },
      },
    },
    plugins: {
      title: { display: false, text: "7-Day timeframe" },
      legend: { display: false },
    },
  };
  const coinData = [
    {
      coinLogo: "https://i.postimg.cc/qvS5hZ24/images.png",
      coinColor: btcColor,
      coinPrice: btcPrice,
      coinSymbol: "BTCUSDT",
      coinName: "Bitcoin",
      chartData: btcChartData,
    },
    {
      coinLogo: "https://i.postimg.cc/L58T0zjx/images-1.png",
      coinColor: ethColor,
      coinPrice: ethPrice,
      coinSymbol: "ETHUSDT",
      coinName: "Ethereum",
    },
    {
      coinLogo: "https://i.postimg.cc/B6G7NLhz/download.jpg",
      coinColor: solColor,
      coinPrice: solPrice,
      coinSymbol: "SOLUSDT",
      coinName: "Solana",
    },
    {
      coinLogo: "https://i.postimg.cc/Znb7zkzF/download-1.jpg",
      coinColor: dogeColor,
      coinPrice: dogePrice,
      coinSymbol: "DOGEUSDT",
      coinName: "Dogecoin",
    },
    {
      coinLogo: "https://i.postimg.cc/HWwfmdQD/images-2.png",
      coinColor: linkColor,
      coinPrice: linkPrice,
      coinSymbol: "LINKUSDT",
      coinName: "Chainlink",
    },

    {
      coinLogo: "https://i.postimg.cc/xjmbTFCS/images-4.png",
      coinColor: adaColor,
      coinPrice: adaPrice,
      coinSymbol: "ADAUSDT",
      coinName: "Cardano",
    },

    {
      coinLogo: "https://i.postimg.cc/dQfTqcv6/images-3.png",
      coinColor: xrpColor,
      coinPrice: xrpPrice,
      coinSymbol: "XRPUSDT",
      coinName: "Ripple",
    },
  ];

  return (
    <>
      <div
        className="tsParticles"
        style={{
          position: "absolute",
          zIndex: -1,
          width: "100vw",
          backgroundColor: "white",
          height: 2500,
          top: 0,
        }}
      >
        {!day ? (
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="circuitPatternDark"
                patternUnits="userSpaceOnUse"
                width="200"
                height="200"
              >
                <path
                  d="M 0 50 H 200 M 50 0 V 200 M 150 0 V 200"
                  stroke="#aaa"
                  strokeWidth="1"
                />
                <circle cx="50" cy="50" r="3" fill="#ccc" />
                <circle cx="150" cy="150" r="3" fill="#ccc" />
                <circle cx="50" cy="150" r="2" fill="#eee" />
                <circle cx="150" cy="50" r="2" fill="#eee" />
              </pattern>

              <pattern
                id="hexPatternDark"
                patternUnits="userSpaceOnUse"
                width="40"
                height="40"
              >
                <polygon
                  points="20,0 30,10 30,30 20,40 10,30 10,10"
                  fill="none"
                  stroke="#999"
                  strokeWidth="1"
                />
              </pattern>

              <pattern
                id="dotPatternDark"
                patternUnits="userSpaceOnUse"
                width="30"
                height="30"
              >
                <circle cx="15" cy="15" r="1.5" fill="#bbb" />
              </pattern>
            </defs>

            <rect width="100%" height="100%" fill="#111" />
            <rect
              width="100%"
              height="100%"
              fill="url(#hexPatternDark)"
              opacity="0.2"
            />
            <rect
              width="100%"
              height="100%"
              fill="url(#dotPatternDark)"
              opacity="0.3"
            />
            <rect
              width="100%"
              height="100%"
              fill="url(#circuitPatternDark)"
              opacity="0.4"
            />
          </svg>
        ) : (
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="circuitPatternLight"
                patternUnits="userSpaceOnUse"
                width="200"
                height="200"
              >
                <path
                  d="M 0 50 H 200 M 50 0 V 200 M 150 0 V 200"
                  stroke="#ccc"
                  strokeWidth="1"
                />
                <circle cx="50" cy="50" r="3" fill="#888" />
                <circle cx="150" cy="150" r="3" fill="#888" />
                <circle cx="50" cy="150" r="2" fill="#aaa" />
                <circle cx="150" cy="50" r="2" fill="#aaa" />
              </pattern>

              <pattern
                id="hexPatternLight"
                patternUnits="userSpaceOnUse"
                width="40"
                height="40"
              >
                <polygon
                  points="20,0 30,10 30,30 20,40 10,30 10,10"
                  fill="none"
                  stroke="#e0e0e0"
                  strokeWidth="1"
                />
              </pattern>

              <pattern
                id="dotPatternLight"
                patternUnits="userSpaceOnUse"
                width="30"
                height="30"
              >
                <circle cx="15" cy="15" r="1.5" fill="#ddd" />
              </pattern>
            </defs>

            <rect width="100%" height="100%" fill="white" />
            <rect
              width="100%"
              height="100%"
              fill="url(#hexPatternLight)"
              opacity="0.1"
            />
            <rect
              width="100%"
              height="100%"
              fill="url(#dotPatternLight)"
              opacity="0.2"
            />
            <rect
              width="100%"
              height="100%"
              fill="url(#circuitPatternLight)"
              opacity="0.3"
            />
          </svg>
        )}
        <div
          style={{
            height: 500,
            overflow: "hidden",
            display: "flex",
            width: "100%",
            position: "absolute",
          }}
        ></div>
      </div>
      {isMobile ? (
        <div className="topHeading" style={{}}>
          <button
            className="menu"
            onClick={() => {
              toggleMenu();
              console.warn("menu toggled");
            }}
          >
            <img
              src={
                !day
                  ? "https://i.postimg.cc/15T7P1FF/Picsart-25-05-29-14-49-46-426.png"
                  : "https://i.postimg.cc/3xCFDfww/Picsart-25-05-04-05-37-21-849.png"
              }
              style={{
                position: "absolute",
                height: day ? "100%" : "110%",
                width: day ? "100%" : "110%",
              }}
            />
          </button>

          <div
            className="title"
            style={{
              fontSize: 18,
              left: isMobile ? "50%" : 100,
              color: day ? "#213547" : "white",
              transform: "translate(-50%,-50%)",
              top: "50%",
            }}
          >
            Bitbanker
          </div>

          <button
            onClick={() => {
              navigate("/signup");
            }}
            className="signInButton"
            style={{
              backgroundColor: day ? "#00d4d4" : "white",
              color: day ? "black" : "#00d4d4",
            }}
          >
            Sign in
          </button>
        </div>
      ) : (
        <div
          className="topHeading"
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <div
            className="title"
            style={{
              color: day ? "black" : "white",
              position: "absolute",
              left: "5%",
            }}
          >
            Bitbanker{" "}
          </div>

          <div
            className="menuList"
            style={{
              position: "absolute",
              display: "flex",
              justifyContent: "space-around",
              flexDirection: "row",
              color: day ? "#213547" : "#ccc",
              gap: 40,
            }}
          >
            <button className="menuItem1">Track Prices</button>
            <button className="menuItem1">Markets</button>
            <button
              onClick={() => {
                navigate("/cschats");
              }}
              className="menuItem1"
            >
              About us
            </button>
            <button
              onClick={() => {
                navigate("/Settings");
              }}
              className="menuItem1"
            >
              Settings
            </button>
            <button className="menuItem1">Banking</button>
          </div>

          <div
            onClick={() => {
              navigate("/signup");
            }}
            className="signInButton"
            style={{
              backgroundColor: day ? "#00d4d4" : "white",
              color: day ? "gray" : "#00d4d4",
            }}
          >
            Register
          </div>
        </div>
      )}
      <div
        className="container"
        style={{
          backgroundColor: "transparent",
          zIndex: 9,
        }}
      >
        <div
          className="outer"
          style={{
            position: "relative",
            flexDirection: isMobile ? "column" : "column",
            backgroundColor: "transparent",
          }}
        >
          {!isMobile ? (
            <>
              <div
                className="heading1"
                style={{
                  color: day ? "#213547" : "#f2fff3",
                  position: "relative",
                  justifyContent: "space-between",
                  flexDirection: isMobile ? "column" : "row",
                  padding: 40,
                  paddingBottom: 20,
                  width: "100%",
                  height: 200,
                  display: "flex",
                  alignItems: "center",
                  textAlign: isMobile ? "center" : "center",
                  fontSize: isMobile ? 12 : 15,
                }}
              >
                <div className="hof1" ref={hof1}>
                  <div
                    style={{
                      display: "flex",
                      opqcity: 0.2,
                      alignItems: "center",
                      justifyContent: "center",
                      height: 80,
                      width: 50,
                    }}
                  >
                    <img
                      src="https://i.postimg.cc/85LH9mhX/file-000000001ee46246ad2d850c2d5649db.png"
                      style={{ height: 50, width: 40 }}
                    />
                  </div>
                  <h1>Fast</h1>
                </div>
                <h1 className="hof2" ref={hof2}>
                  Secured
                </h1>
                <h1 className="hof3" ref={hof3}>
                  Efficient
                </h1>
                <h1 className="hof4" style={{}} ref={hof4}>
                  Hybrid
                </h1>
              </div>

              <FeatureBox day={day} style={{ backgroundColor: "red" }} />
            </>
          ) : (
            <FeatureBox day={day} />
          )}

          <div
            style={{ backgroundColor: "transparent" }}
            className="outerMiddle"
          >
            <div
              className="boxAndText"
              style={{
                padding: 20,
                justifyContent: "space-between",
                display: "flex",
                width: "85%",
                flexDirection: isMobile ? "column" : "row",
                gap: 20,
                backgroundColor: "transparent",
              }}
            >
              <div
                className="firstGroup"
                style={{
                  justifyContent: "space-between",
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  position: "relative",
                  flexDirection: "column",
                  gap: 40,
                }}
              >
                <div
                  ref={cryptoBoxRef}
                  className="cryptoBox"
                  style={{
                    backgroundColor: day ? "white" : "#213547",
                    opacity: 1,
                    padding: 0,
                  }}
                >
                  <h2
                    className="cryptoH2"
                    ref={boxTitleRef}
                    style={{
                      margin: 0,
                      padding: 10,
                      borderRadius: 20,
                      textAlign: "center",
                      color: day ? "#213547" : "#feb819",
                      backgroundColor: day ? "#00d4d4" : "#213547",
                      border: day ? "2px solid #00d4d4" : "2px solid #feb819",
                    }}
                  >
                    Crypto and Banking
                  </h2>
                </div>

                {autoType ? (
                  <div
                    ref={boxText}
                    className="boxText"
                    style={{
                      fontSize: 15,
                      textAlign: "center",
                      backgroundColor: "transparent",
                      color: "#213547",
                    }}
                  >
                    {typedText}
                  </div>
                ) : (
                  <div
                    ref={boxText}
                    className="boxText"
                    style={{
                      fontSize: 15,
                      textAlign: "center",
                      backgroundColor: "transparent",
                      color: day ? "#213547" : "#ccc",
                    }}
                  >
                    The speed of blockchain transactions and the ultimate safety
                    of banking, all built together to empower you with the ease
                    and confidence of trading your choice cryptocurrencies
                    anywhere, anytime from <b>Bitbanker</b>. Ready to explore
                    and trade?
                  </div>
                )}

                <div
                  ref={loginRef}
                  style={{
                    height: 80,
                    width: "90%",
                    borderRadius: 20,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "transparent",
                  }}
                >
                  <div
                    className="login2"
                    style={{ backgroundColor: day ? "white" : "grey" }}
                  >
                    <div
                      style={{
                        alignItems: "center",
                        justifyContent: "center",
                        display: "flex",
                        position: "relative",
                        color: day ? "rgba(0,0,0,0.6)" : "#ccc",
                        zIndex: 10,
                        backgroundColor: day ? "white" : "grey",
                        fontSize: 12,
                      }}
                    >
                      Quick sign in
                      <img
                        ref={arrowRef}
                        className="arrowRight"
                        src="https://i.postimg.cc/hjwq2yr9/file-00000000df6061f9a2d97efda108b371.png"
                        style={{
                          position: "absolute",
                          height: 18,
                          bottom: -15,
                          right: 10,
                          width: 25,
                          opacity: 1,
                        }}
                      />
                    </div>

                    <button
                      onClick={() => navigate("/signup")}
                      ref={login2Ref}
                      className="login2Button"
                      style={{
                        backgroundColor: day ? "#213547" : "#feb819",
                        fontSize: 14,
                        color: day ? "#ffffff" : "#213547",
                      }}
                    >
                      Sign in
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="secondGroup"
              style={{
                justifyContent: "space-between",
                display: "flex",
                alignItems: "center",
                width: isMobile ? "100%" : 1000,
                position: "relative",
                backgroundColor: "transparent",
                flexDirection: isMobile ? "column" : "row",
                gap: 40,
              }}
            >
              <div
                onClick={() => console.log(window.innerWidth)}
                style={{
                  justifyContent: "space-betweeen",
                  display: "flex",
                  flexDirection: "column",
                  gap: 40,
                  position: "relative",
                  alignItems: "center",
                  backgroundColor: "transparent",
                }}
              >
                <div
                  className="nextBack"
                  style={{
                    width: isMobile ? "95%" : "88%",
                    backgroundColor: "transparent",
                    zIndex: 50,
                    justifyContent: "space-between",
                    position: "absolute",
                    top: "38%",
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "row",
                    gap: "66%",
                  }}
                >
                  <button
                    onClick={() => {
                      scrollBoxes("prev");
                    }}
                    style={{
                      boxShadow: day
                        ? "0px 0px 4px rgba(0,0,0,0.5)"
                        : "0px 0px 4px #ccc",
                      color: day ? "#feb819" : "#00d4d4",
                      backgroundColor: day ? "#213547" : "black",
                    }}
                    className="back"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => {
                      scrollBoxes("next");
                    }}
                    ref={nextRef}
                    className="next"
                    style={{
                      color: day ? "#feb819" : "#00d4d4",
                      boxShadow: day
                        ? "0px 1px 4px rgba(0,0,0,0.5)"
                        : "0px 0px 4px #ccc",
                      backgroundColor: day ? "#213547" : "black",
                    }}
                  >
                    Next
                  </button>
                </div>

                <h2
                  ref={coinTitle}
                  style={{
                    fontSize: 25,
                    padding: 20,
                    textAlign: "center",
                    color: day ? "#213547" : "white",
                  }}
                >
                  Trade your favourite
                  <b
                    style={{
                      color: "#feb819",
                      padding: 10,
                    }}
                  >
                    coins
                  </b>
                  with speed,<b style={{ color: "#feb819" }}> anytime</b>
                </h2>

                <div
                  className="sampleBackground"
                  ref={containerRef}
                  style={{
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    width: isMobile ? "85%" : "80%",

                    height: 400,
                    backgroundColor: "transparent",
                    borderRadius: 20,
                    overflow: "hidden",
                    border: "2px solid rgba(33,53,71,0.5)",
                  }}
                >
                  <Particles
                    id="tsparticles"
                    init={initParticles}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      zIndex: 23,
                    }}
                    options={particlesOption}
                  />

                  <div
                    className="coinBoxTop"
                    style={{
                      position: "absolute",
                      pointerEvents: "none",
                      zIndex: 40,
                      background:
                        !day &&
                        "linear-gradient(to right,rgba(38,70,98,0.6) 0%,rgba(0,0,0,0.0) 5%,                                      rgba(0, 0, 0, 0.0) 15%,                                         rgba(0, 0, 0, 0) 30%,rgba(0, 0, 0, 0) 70%,rgba(0, 0, 0, 0.0) 85%,rgba(0,0,0,0.0)  95%,rgba(38,70,98,0.6) 100%)",
                      height: "100%",
                      borderRadius: 20,
                      width: "100%",
                    }}
                  ></div>

                  <div
                    style={{
                      zIndex: 24,
                      position: "absolute",
                      width: "100%",
                      paddingLeft: 20,
                      paddingRight: 80,
                      height: 500,
                    }}
                    ref={sampleContainer}
                    className="sampleContainer"
                  >
                    {coinData.map((item, index) => {
                      return (
                        <div
                          key={index}
                          onClick={() => getChartData()}
                          className="coinBox"
                          ref={coinBox}
                          style={{
                            background:
                              !day &&
                              "linear-gradient(to bottom, #566262 0%, #566262 20%, rgba(0,0,0,0.7) 60%,black 80%, #1a2a38 100%)",
                            boxShadow: day
                              ? "0px 1px 4px white, 0px 2px 20px rgba(0,0,0,0.7)"
                              : "0px 0px 4px #ccc, 0px 2px 20px rgba(0,0,0,0.7)",
                            opacity: 1,
                            overflow: "hidden",
                            height: 270,
                            width: 180,
                          }}
                        >
                          <div
                            ref={(el) => (coinLogoRefs.current[index] = el)}
                            className="coinLogo"
                            style={{
                              cursor: "pointer",
                              boxShadow: day
                                ? "0px 0px 4px white, 0px 0px 7px black"
                                : "0px 0px 4px #ccc, 0px 2px 20px rgba(255,255,255, 1)",
                            }}
                          >
                            <img
                              className="logoImg"
                              src={item.coinLogo}
                              style={{
                                height: "100%",
                                width: "100%",
                                position: "absolute",
                              }}
                            />
                          </div>

                          <div
                            style={{
                              fontSize: !item.coinPrice && 12,
                              color: item.coinPrice ? item.coinColor : "grey",
                            }}
                            className="coinPrice"
                          >
                            {item.coinPrice == null
                              ? "Loading"
                              : Number(item.coinPrice).toLocaleString("en-us")}
                          </div>

                          <div
                            style={{
                              height: 150,
                              position: "absolute",
                              left: 2,
                              top: 70,
                              zIndex: 20,
                              width: "100%",
                              backgroundColor: "transparent",
                              alignItems: "center",
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            {btcChartData ? (
                              <Line
                                options={chartOptions2}
                                width={218}
                                height={"100%"}
                                data={btcChartData}
                              />
                            ) : (
                              <Skeleton height={50} width={150} />
                            )}
                          </div>

                          <div className="coinSymbol">{item.coinSymbol}</div>
                          <div className="coinName">{item.coinName}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div
                  className="notes"
                  style={{ color: day ? "#feb819" : "#ccc" }}
                >
                  <b style={{}}>Bitbanker </b>is an efficient web app from{" "}
                  <a href="https://wa.me/2349036202766">
                    <b
                      style={{
                        color: "#ef9800",
                        padding: "2px 4px",
                        border: "1px solid white",
                        borderRadius: 5,
                        backgroundColor: "black",
                      }}
                    >
                      Bytance<b style={{ color: "#ec5300" }}>Tech</b>
                    </b>
                  </a>
                  , here every customer is verified and user data are protected
                  by the Byt-S architecture, guaranteeing
                  <b style={{}}> 24/7</b> security of funds.{"\n"} Prices change
                  according to transactions in the order books. Market prices
                  brought to you seamlessly!
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
