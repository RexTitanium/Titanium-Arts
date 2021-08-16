import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Home from "../pages/Home";
import Work from "../pages/Work";
import About from "../pages/About";
import Contact from "../pages/Contact";
import IndCard from "./IndCard";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import "./styles/Main.css";
import { Cards, bg } from "../shared/data";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";
import ImageUpload from "./ImageUpload";
import Login from "./Login";
import {db} from '../shared/firebase';

function Main() {
  const location = useLocation();
  const [loc, setLoc] = useState(0);
  const [banner, setBanner] = useState("");
  const [dcCards, setCards] = useState(null);
  const [auth, setAuth] = useState(false);
 

  useEffect(() => {
    function setBg() {
      setBanner(bg[Math.floor(Math.random() * bg.length)]);
    }
    setBg();
  });

  useEffect(() => {
    console.log('mounted')
    db.collection('CardData')
    .get()
    .then(snapshot => {
      const Cards = []
      var id =0;
      snapshot.forEach((card) => {

        const data = card.data();
        Cards.push({...data, id: id});
        id = id +1;
      })
      setCards(Cards);
    })
    .catch( error => console.log(error));
  }, []);

  console.log(dcCards);
  const HomePage = () => {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Home cards={dcCards} dcCards={dcCards} banner={banner} setLoc={setLoc} />
      </motion.div>
    );
  };
  const CardWithId = ({ match }) => {
    console.log(match.params.cardId);
    return (
      <IndCard
        cards={
          dcCards && dcCards.filter(
            (card) => card.id === parseInt(match.params.cardId, 10)
          )[0]
        }
        setLoc={setLoc}
        similar={dcCards && dcCards.filter(
          (card) => card.id !== parseInt(match.params.cardId, 10)
        )}
      />
    );
  };
  const WorkPage = () => {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Work cards={dcCards} setLoc={setLoc} />
      </motion.div>
    );
  };
  const AboutPage = () => {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <About banner={banner} setLoc={setLoc} />
      </motion.div>
    );
  };

  const ContactPage = () => {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Contact setLoc={setLoc} banner={banner} />
      </motion.div>
    );
  };

  return (
    <div>
      <ScrollToTop />
      <div className="header" style={{ zIndex: 2 }}>
        <Navbar setLoc={setLoc} loc={loc} />
      </div>

      <div>
        <AnimatePresence exitBeforeEnter initial={false}>
          <Switch location={location} key={location.pathname}>
            <Route path="/home" component={() => <HomePage />} />
            <Route exact path="/work" component={() => <WorkPage />} />
            <Route exact path="/aboutus" component={() => <AboutPage />} />
            <Route exact path="/contactus" component={() => <ContactPage />} />
            <Route exact path="/login" component={() => <Login setAuth={setAuth} />} />
            <Route exact path="/upload" component={() => <ImageUpload auth={auth} setAuth={setAuth} /> } />
            <Route
              path="/work/:cardId"
              render={(routeProps) => <CardWithId {...routeProps} />}
            />
            <Redirect to="/home" />
          </Switch>
        </AnimatePresence>
      </div>

      <div className="footer" style={{ zIndex: 2, marginTop: "20px" }}>
        <Footer />
      </div>
    </div>
  );
}

export default Main;
