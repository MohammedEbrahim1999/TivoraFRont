'use client'
import { useTheme } from "@mui/material";
import 'animate.css';
import MainSlider from "./Component/Home Component/MainSlider";
import Collection from "./Component/Home Component/Collection";
import Sale from "./Component/Home Component/Sale";
import Blog from "./Component/Home Component/Blog";
import News from "./Component/Home Component/News";
import Products from "./Component/Home Component/Products";





export default function Home() {
  const theme = useTheme();
  return (
    <>
      <MainSlider />
      <Collection />
      <Products />
      <Sale/>
      <Blog />
      <News />
    </>
  );
}
// mainBGWhite.png