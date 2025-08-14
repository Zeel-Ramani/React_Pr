import React from "react"
import { HiOutlineArrowLongRight } from "react-icons/hi2";
import { FiShoppingCart } from "react-icons/fi";

function TinySlider({ items, perView = { base: 1, md: 2, lg: 3 }, gap = 16 }) {
  const ref = React.useRef(null)
  const [pv, setPv] = React.useState(perView.base)

  React.useEffect(() => {
    const calc = () => {
      const w = window.innerWidth
      if (perView.lg && w >= 1024) return setPv(perView.lg)
      if (perView.md && w >= 768) return setPv(perView.md)
      setPv(perView.base)
    }
    calc()
    window.addEventListener("resize", calc)
    return () => window.removeEventListener("resize", calc)
  }, [perView])

  const baseCount = items.length
  const triple = React.useMemo(() => [...items, ...items, ...items], [items])

  const stepRef = React.useRef(0)   // one card width + gap
  const trackRef = React.useRef(0)  // length of one original set
  const isWrappingRef = React.useRef(false)

  React.useEffect(() => {
    const el = ref.current
    if (!el || baseCount === 0) return
    const measure = () => {
      const w = el.clientWidth
      const one = w / Math.max(1, pv)
      stepRef.current = one + gap
      trackRef.current = baseCount * stepRef.current
      // center to middle set, keep relative offset
      const rel = ((el.scrollLeft % trackRef.current) + trackRef.current) % trackRef.current
      const prev = el.style.scrollBehavior
      el.style.scrollBehavior = "auto"
      el.scrollLeft = trackRef.current + rel
      el.style.scrollBehavior = prev
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [pv, gap, baseCount])

  // Safe wrap (no smooth during wrap to avoid vibration)
  const wrapIfNeeded = () => {
    const el = ref.current
    if (!el || isWrappingRef.current) return
    const track = trackRef.current
    if (!track) return

    const x = el.scrollLeft
    const min = track * 0.5
    const max = track * 1.5
    if (x < min || x > max) {
      isWrappingRef.current = true
      const prev = el.style.scrollBehavior
      el.style.scrollBehavior = "auto"
      el.scrollLeft = x < min ? x + track : x - track
      el.style.scrollBehavior = prev
      requestAnimationFrame(() => (isWrappingRef.current = false))
    }
  }

  // Click step = smooth; wrap afterwards
  const step = (dir) => {
    let el = ref.current
    if (!el) return
    let target = el.scrollLeft + dir * stepRef.current
    el.scrollTo({ left: target, behavior: "smooth" })
    window.setTimeout(wrapIfNeeded, 300)
  }

  // Press & hold continuous
  let timer = React.useRef(null)
  let startHold = (dir) => {
    if (timer.current) return
    timer.current = window.setInterval(() => {
      const el = ref.current
      if (!el) return
      el.scrollLeft += dir * 6 // speed
      wrapIfNeeded()
    }, 16)
  }
  let stopHold = () => {
    if (timer.current) {
      clearInterval(timer.current)
      timer.current = null
    }
  }

  return (
    <div className="pz-slider">
      <div className="pz-viewport">
        <div
          ref={ref}
          className="pz-track"
          style={{ gap: `${gap}px` }}
          onScroll={wrapIfNeeded}
        >
          {triple.map((it, i) => (
            <div
              key={`${it.id}-${i}`}
              className="pz-card"
              style={{
                width: `calc(${100 / Math.max(1, pv)}% - ${
                  (gap * (Math.max(1, pv) - 1)) / Math.max(1, pv)
                }px)`,
              }}
            >
              <div className="pz-card-inner">
                {/* Circular figure like reference */}
                <div className="pz-figure">
                  <img src={it.imageUrl || "/placeholder.svg"} alt={it.title || "pizza"} className="pz-img" />
                </div>

                {/* Title + Price */}
                <div className="pz-row">
                  <h3 className="pz-title">{it.title}</h3>
                  {it.price && <span className="pz-price">{it.price}</span>}
                </div>

                {/* Stars */}
                <div className="pz-stars">★ ★ ★ ★ ★</div>

                {/* Description */}
                {it.description && <p className="pz-desc">{it.description}</p>}

                {/* Button */}
                <button type="button" className="pz-btn">
                  <span className="pz-cart" aria-hidden="true">🛒</span>
                  ORDER NOW
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Arrows */}
      <button
        className="pz-arrow pz-left"
        aria-label="Prev"
        onClick={() => step(-1)}
        onMouseDown={() => startHold(-1)}
        onMouseUp={stopHold}
        onMouseLeave={stopHold}
        onTouchStart={(e) => { e.preventDefault(); startHold(-1) }}
        onTouchEnd={stopHold}
        onTouchCancel={stopHold}
      >
        {"<"}
      </button>
      <button
        className="pz-arrow pz-right"
        aria-label="Next"
        onClick={() => step(1)}
        onMouseDown={() => startHold(1)}
        onMouseUp={stopHold}
        onMouseLeave={stopHold}
        onTouchStart={(e) => { e.preventDefault(); startHold(1) }}
        onTouchEnd={stopHold}
        onTouchCancel={stopHold}
      >
        {">"}
      </button>
    </div>
  )
}

/* ================= Benner (unchanged) ================= */
function Benner() {
  return (
    <div className="banner">
      <div className="container">
        <div className="row align-items-center justify-content-start">
          <div className="col-md-6">
            <div className="benner-contant position-relative">
              <h1 className="display-4 fw-bold mb-3">
                Handmade, <br /> With an Extra <br /> Pinch of <span className="text-danger">Love</span>
              </h1>
              <p className="text-secondary fs-4 fw-semibold">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              </p>
              <a
                href="javascript:void(0)"
                className="btn btn-warning p-3 px-5 rounded-pill text-white fw-semibold fs-4 text-uppercase"
              >
                <FiShoppingCart className="me-3 fs-3"/>
                Order Now
              </a>
              <img
                src="https://themes.templatescoder.com/pizzon/html/demo/1-2/01-Modern/images/black-jamun.png"
                alt=""
                className="benner-img2"
              />
              <img src="https://pizza-shop-ruby.vercel.app/images/header-img.png" alt="" className="benner-img1" />
            </div>
          </div>
          <div className="col-md-6">
            <div className="benner-imgs position-relative">
              <img src="https://pizza-shop-ruby.vercel.app/images/banner-img.png" alt="" className="img1" />
              <img src="https://pizza-shop-ruby.vercel.app/images/home-leaf.png" alt="" className="img2" />
              <img src="https://pizza-shop-ruby.vercel.app/images/buy-one-get.png" alt="" className="img3" />
              <img src="https://i.ibb.co/Kc5VBvKL/Screenshot-2025-08-07-180647.png" alt="" className="img4" />
              <img src="https://pizza-shop-ruby.vercel.app/images/onion.png" alt="" className="img5" />
              <img src="https://pizza-shop-ruby.vercel.app/images/banner-img-bottom.png" alt="" className="img6" />
            </div>
          </div>
        </div>
      </div>
      <div className="circle"></div>
    </div>
  )
}

/* ========== Main: Slider OUTSIDE container (full section width) ========== */
function Main() {
  let items = [
    {
      id: "1",
      imageUrl: "https://themes.templatescoder.com/pizzon/html/demo/1-2/01-Modern/images/pizza-3.png",
      title: "Shrimp pizza",
      price: "$35.00",
      description: "All the Lorem Ipsum generators on the Internet tend to repeat",
    },
    {
      id: "2",
      imageUrl: "https://themes.templatescoder.com/pizzon/html/demo/1-2/01-Modern/images/pizza-1.png",
      title: "Cheese pizza",
      price: "$25.00",
      description: "A classic favorite with melted mozzarella and cheddar",
    },
    {
      id: "3",
      imageUrl: "https://themes.templatescoder.com/pizzon/html/demo/1-2/01-Modern/images/pizza-2.png",
      title: "Seafood pizza",
      price: "$65.00",
      description: "Fresh seafood medley on a crispy crust",
    },
    {
      id: "4",
      imageUrl: "https://themes.templatescoder.com/pizzon/html/demo/1-2/01-Modern/images/pizza-4.png",
      title: "Margherita",
      price: "$20.00",
      description: "Tomatoes, basil and mozzarella — simple and perfect",
    },
  ]

  return (
    <div className="main">
      <section>
        <div className="row align-items-center">
          <div className="col-md-4">
            <div className="main-imgs">
              <img src="https://pizza-shop-ruby.vercel.app/images/daily-fresh.png" alt="" />
            </div>
          </div>
          <div className="col-md-8">
            <div className="main-contant position-relative">
              <h4>
                Daily fresh and <br /> always tasty
              </h4>
              <p className="fs-5 text-secondary mt-3">
                There are many variations of passages <br /> of Lorem Ipsum available, but the <br /> majority haved
              </p>
              <img
                src="https://pizza-shop-ruby.vercel.app/images/daily-fresh-vacter.png"
                alt=""
                className="main-img1"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="Menu py-5">
        {/* Title in container (as before) */}
        <div className="container">
          <div className="menu-title position-relative mb-5">
            <div className="d-flex align-items-center">
              <p className="mb-0 text-danger fw-semibold me-3">Popular Dishes</p>
              <span className="line"></span>
            </div>
            <h2 className="fw-bold">Browse Our Menu</h2>
            <img src="https://pizza-shop-ruby.vercel.app/images/tamato.png" alt="" className="menu-img1" />
          </div>
        </div>

        {/* SLIDER OUTSIDE CONTAINER (full section width) */}
        <TinySlider items={items} perView={{ base: 1, md: 2, lg: 3 }} gap={16} />
      </section>

      <section className="our-story mt-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <div className="our-story-imgs position-relative">
                <img src="https://pizza-shop-ruby.vercel.app/images/our-story.png" alt="" className="stort-img1 me-5"/>
                <img src="https://themes.templatescoder.com/pizzon/html/demo/1-2/01-Modern/images/onion.png" alt=""  className="stort-img2"/>
                <img src="https://themes.templatescoder.com/pizzon/html/demo/1-2/01-Modern/images/black-jamun.png" alt="" className="stort-img3"/>
              </div>
            </div>
            <div className="col-md-6">
              <div className="our-story-contant">
                <div className="d-flex align-items-center">
                  <h4 className="text-danger me-3">Our Story</h4>
                  <span className="line"></span>
                </div>
                <h2 className="fs-1 fw-bold">The Pizzon Has Excellent Of Quality Foods</h2>
                <p className="fs-5 text-secondary mt-3">
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                </p>
                <a href="javascript:void(0)" className="btn btn-warning p-2 px-5 rounded-pill text-white fw-semibold fs-4 text-uppercase mt-3">
                  <FiShoppingCart className="me-3"/>Read More
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="strength mt-5 position-relative">
          <div className="container">
            <div className="strength-title mb-5">
              <div className="d-flex align-items-center">
                  <h4 className="text-danger me-3">Our Story</h4>
                  <span className="line"></span>
              </div>
              <img src="https://themes.templatescoder.com/pizzon/html/demo/1-2/01-Modern/images/strength-vacter.png" alt=""  className="strength-img1"/>
             <div>
                <h2 className="fw-bold">Why We Are The Best?</h2>
              </div>
          </div>

          <div className="strength-inner">
            <div className="row">
              <div className="col-md-3">
                  <div className="strength-item">
                    <div className="strength-img mb-4">
                      <img src="https://themes.templatescoder.com/pizzon/html/demo/1-2/01-Modern/images/all-kinds-of-foods.png" alt="" />
                    </div>

                    <div className="strength-content">
                      <h4>All kinds of Foods</h4>
                      <p className="fs-5 text-secondary">Lorem Ipsum is simply dummy text of the printing and type setting industry.</p>
                    </div>
                  </div>
              </div>

              <div className="col-md-3">
                  <div className="strength-item">
                    <div className="strength-img mb-4">
                      <img src="https://themes.templatescoder.com/pizzon/html/demo/1-2/01-Modern/images/fresh-foods.png" alt="" />
                    </div>

                    <div className="strength-content">
                      <h4>Fresh Foods</h4>
                      <p className="fs-5 text-secondary">Lorem Ipsum is simply dummy text of the printing and type setting industry.</p>
                    </div>
                  </div>
              </div>

              <div className="col-md-3">
                  <div className="strength-item">
                    <div className="strength-img mb-4">
                      <img src="https://themes.templatescoder.com/pizzon/html/demo/1-2/01-Modern/images/best-taste.png" alt="" />
                    </div>

                    <div className="strength-content">
                      <h4>Best Taste</h4>
                      <p className="fs-5 text-secondary">Lorem Ipsum is simply dummy text of the printing and type setting industry.</p>
                    </div>
                  </div>
              </div>

              <div className="col-md-3">
                  <div className="strength-item">
                    <div className="strength-img mb-4">
                      <img src="https://themes.templatescoder.com/pizzon/html/demo/1-2/01-Modern/images/on-time-delivery.png" alt="" />
                    </div>

                    <div className="strength-content">
                      <h4>On Time Delivery</h4>
                      <p className="fs-5 text-secondary">Lorem Ipsum is simply dummy text of the printing and type setting industry.</p>
                    </div>
                  </div>
              </div>
          </div>

          </div>
          </div>
      </section>

      <section className="testimonials mt-5 position-relative">
        <div className="container">
          <div className="testimonials-title">
            <div className="d-flex align-items-center">
                  <h4 className="text-danger me-3">Customer Feedback</h4>
                  <span className="line"></span>
            </div>
            <img src="https://themes.templatescoder.com/pizzon/html/demo/1-2/01-Modern/images/leaf.png" alt="" className="testimonials-img1"/>
            <div>
                <h2 className="fw-bold display-6">Client Testimonials</h2>
              </div>
          </div>

          <div className="testimonials-inner mt-5">
            <div className="row">
              <div className="col-md-3">
                <div className="testimonials-item text-center border pt-5 pb-4 rounded-4 px-4">
                  <div className="testimonials-img">
                    <img src="https://themes.templatescoder.com/pizzon/html/demo/1-2/01-Modern/images/client-1.jpg" alt=""  className="rounded-circle"/>
                  </div>
                  <div className="testimonials-contant">
                    <h4 className="my-3">Johan Doe</h4>
                    <p className="fs-5 text-secondary">“Lorem Ipsum is simply <br/> dummy text of the print <br/> book. It has survived not <br/> only five centuries, but <br/> also the leap”</p>
                    <h5 className="text-warning">★ ★ ★ ★ ★</h5>
                  </div>
                </div>
              </div>

              <div className="col-md-3">
                <div className="testimonials-item text-center border pt-5 pb-4 rounded-4 px-4">
                  <div className="testimonials-img">
                    <img src="https://themes.templatescoder.com/pizzon/html/demo/1-2/01-Modern/images/client-2.jpg" alt=""  className="rounded-circle"/>
                  </div>
                  <div className="testimonials-contant">
                    <h4 className="my-3">Alex Saanu</h4>
                    <p className="fs-5 text-secondary">“Lorem Ipsum is simply <br/> dummy text of the print <br/> book. It has survived not <br/> only five centuries, but <br/> also the leap”</p>
                    <h5 className="text-warning">★ ★ ★ ★ ★</h5>
                  </div>
                </div>
              </div>

              <div className="col-md-3">
                <div className="testimonials-item text-center border pt-5 pb-4 rounded-4 px-4">
                  <div className="testimonials-img">
                    <img src="https://themes.templatescoder.com/pizzon/html/demo/1-2/01-Modern/images/client-3.jpg" alt=""  className="rounded-circle"/>
                  </div>
                  <div className="testimonials-contant">
                    <h4 className="my-3">Jona Leoner</h4>
                    <p className="fs-5 text-secondary">“Lorem Ipsum is simply <br/> dummy text of the print <br/> book. It has survived not <br/> only five centuries, but <br/> also the leap”</p>
                    <h5 className="text-warning">★ ★ ★ ★ ★</h5>
                  </div>
                </div>
              </div>

              <div className="col-md-3">
                <div className="testimonials-item text-center border pt-5 pb-4 rounded-4 px-4">
                  <div className="testimonials-img">
                    <img src="https://themes.templatescoder.com/pizzon/html/demo/1-2/01-Modern/images/client-4.jpg" alt=""  className="rounded-circle"/>
                  </div>
                  <div className="testimonials-contant">
                    <h4 className="my-3">Takar Bowa</h4>
                    <p className="fs-5 text-secondary">“Lorem Ipsum is simply <br/> dummy text of the print <br/> book. It has survived not <br/> only five centuries, but <br/> also the leap”</p>
                    <h5 className="text-warning">★ ★ ★ ★ ★</h5>
                  </div>
                </div>
              </div>

            </div>
          </div>  
        </div>
      </section> 

      <section className="Reservation">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <div className="Reservation-title">
                <div className="d-flex align-items-center">
                  <h4 className="text-danger me-3">Reservation</h4>
                  <span className="line"></span>
                </div>
                <img src="https://themes.templatescoder.com/pizzon/html/demo/1-2/01-Modern/images/leaf.png" alt="" className="testimonials-img1"/>
                <div>
                  <h2 className="fw-bold display-6">Book A Table Now!</h2>
                </div>

                <div className="Reservation-form mt-5">
                  <form>
                    <ul className="list-unstyled d-flex gap-3 mt-4">
                      <li>
                        <input type="text" placeholder="Name*" className="rounded border"/>
                      </li>
                      <li>
                        <input type="email" placeholder="Email*" className="rounded border"/>
                      </li>
                    </ul>

                    <ul className="list-unstyled d-flex gap-3 mt-4">
                      <li>
                        <input type="number" placeholder="Phone*" className="rounded border"/>
                      </li>
                      <li>
                        <input type="text" placeholder="Time*" className="rounded border"/>
                      </li>
                    </ul>

                    <ul className="list-unstyled d-flex gap-3 mt-4">
                      <li>
                        <input type="text" placeholder="Date*" className="rounded border"/>
                      </li>
                      <li>
                        <input type="text" placeholder="Guest*" className="rounded border"/>
                      </li>
                    </ul>

                    <button className="btn btn-warning p-2 px-4 rounded-pill text-white fw-semibold fs-5 text-uppercase mt-4">Book Now</button>
                </form>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="Reservation-imgs position-relative">
                <img src="https://themes.templatescoder.com/pizzon/html/demo/1-2/01-Modern/images/reservation-pizza.png" alt="" className="reservation-img1"/>
                <img src="https://themes.templatescoder.com/pizzon/html/demo/1-2/01-Modern/images/leaf-1.png" alt="" className="reservation-img2"/>
                <img src="https://themes.templatescoder.com/pizzon/html/demo/1-2/01-Modern/images/leaf-3.png" alt="" className="reservation-img3"/>
                <img src="https://themes.templatescoder.com/pizzon/html/demo/1-2/01-Modern/images/leaf-2.png" alt="" className="reservation-img4"/>
                <img src="https://themes.templatescoder.com/pizzon/html/demo/1-2/01-Modern/images/book-leaf.png" alt="" className="reservation-img5"/>
                <img src="https://themes.templatescoder.com/pizzon/html/demo/1-2/01-Modern/images/book-jamun.png" alt="" className="reservation-img6"/>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="News py-5">
        <div className="container">
          <div className="News-title mb-5">
            <div className="d-flex align-items-center">
              <h4 className="text-danger me-3">From Our Blog</h4>
              <span className="line"></span>
            </div>
            <img src="https://themes.templatescoder.com/pizzon/html/demo/1-2/01-Modern/images/leaf.png" alt="" className="testimonials-img1" />
            <div>
              <h2 className="fw-bold display-6">Our Latest News</h2>
            </div>
          </div>

          <div className="News-inner">
            <div className="row">
              <div className="col-md-6">
                <div className="News-img">
                  <img src="https://themes.templatescoder.com/pizzon/html/demo/1-2/01-Modern/images/blog-1.jpg" alt="" className="news-img1 rounded-4 img-fluid"/>
                </div>
                  <div className="News-content mt-4">
                    <div className="d-flex align-items-center">
                      <h6 className="me-3 text-secondary">07 Mar 2022</h6>
                      <span className="line bg-secondary bg-opacity-50"></span>
                    </div>
                    <p className="fs-4 fw-semibold">How to keep fear from ruining your art business <br/> with confident</p>
                    <div>
                      <div className="mt-4 d-flex align-items-center justify-content-between">
                        <ul className="list-unstyled d-flex align-items-center gap-3 mt-3 mb-0">
                          <li>
                            <img src="https://themes.templatescoder.com/pizzon/html/demo/1-2/01-Modern/images/blog-author.png" alt="" className="rounded-circle"/>
                          </li>
                          <li>
                            <h5>
                              David Milar
                            </h5>
                            <p className="text--secondary mb-0">London, United Kindom</p>
                          </li>
                        </ul>
                        <div className="d-flex align-items-center btn me-4">
                          <a href="javascript:void(0)" className="btn text-danger fw-semibold fs-5">Read More</a>
                          <HiOutlineArrowLongRight className="text-danger arrow fs-1 ps-3 "/>
                        </div>
                      </div>
                    </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="News-items ms-3">
                  <div className="row align-items-center">
                    <div className="col-md-6">
                      <div className="News-img">
                        <img src="https://themes.templatescoder.com/pizzon/html/demo/1-2/01-Modern/images/blog-2.jpg" alt="" className="img-fluid rounded-4 news-img2" />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="News-comtant">
                        <h6 className="text-secondary">
                          07 Mar 2022
                        </h6>
                        <p className="fs-5 fw-semibold">How to keep fear from ruining your art business with <br /> confident</p>
                        <div className="d-flex align-items-center">
                          <a href="javascript:void(0)" className="text-danger fw-semibold fs-5 text-decoration-none">Read More</a>
                          <HiOutlineArrowLongRight className="text-danger fs-2 ms-3" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="News-items ms-3 mt-4">
                  <div className="row align-items-center">
                    <div className="col-md-6">
                      <div className="News-img">
                        <img src="https://themes.templatescoder.com/pizzon/html/demo/1-2/01-Modern/images/blog-3.jpg" alt="" className="img-fluid rounded-4" />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="News-comtant">
                        <h6 className="text-secondary">
                          07 Mar 2022
                        </h6>
                        <p className="fs-5 fw-semibold">How to keep fear from ruining your art business with <br /> confident</p>
                        <div className="d-flex align-items-center">
                          <a href="javascript:void(0)" className="text-danger fw-semibold fs-5 text-decoration-none">Read More</a>
                          <HiOutlineArrowLongRight className="text-danger fs-2 ms-3" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="News-items ms-3 mt-4">
                  <div className="row align-items-center">
                    <div className="col-md-6">
                      <div className="News-img">
                        <img src="https://themes.templatescoder.com/pizzon/html/demo/1-2/01-Modern/images/blog-4.jpg" alt="" className="img-fluid rounded-4" />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="News-comtant">
                        <h6 className="text-secondary">
                          07 Mar 2022
                        </h6>
                        <p className="fs-5 fw-semibold">How to keep fear from ruining your art business with <br /> confident</p>
                        <div className="d-flex align-items-center">
                          <a href="javascript:void(0)" className="text-danger fw-semibold fs-5 text-decoration-none">Read More</a>
                          <HiOutlineArrowLongRight className="text-danger fs-2 ms-3" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Benner;
export { Main };