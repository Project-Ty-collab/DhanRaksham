import React from 'react';
import './Home.css'; // Ensure you have the relevant styles here
import logo from "../../assets/logo.png";
export const Home = () => {
  return (
    
    <div>
      <nav>
        <div className="container nav-container">
        <div className="logo">
          <img src={logo} alt="Logo" className="logo-img" />DhanRaksham</div>
          <ul className="nav-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#features">Features</a></li>
            <li><a href="#market">Markets</a></li>
            <li><a href="#insurance">Insurance</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
          <div className="twobtn">
            <button className="btn">Sign in</button>
            <button className="btn">Sign up</button>
          </div>
        </div>
      </nav>
      
      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="container">
          <div className="hero-content">
            <h1>Manage Your Finances Like Never Before</h1>
            <p>DhanRaksham provides you with all the tools you need to track investments, compare insurance plans, and secure
              your financial future. Join millions of satisfied users today.</p>
            <button className="btn">Explore Now</button>
          </div>
          <div className="hero-image">
          </div>
        </div>
      </section>
    
      {/* Services Section */}
      <section className="services">
        <div className="section-header">
          <h2 className="section-title">Services We Provide</h2>
          <p className="section-subtitle">Comprehensive solutions for all your financial needs, from insurance coverage to stock
            market investments.</p>
        </div>
        <div className="services-grid">
          <div className="service-card">
            <div className="service-icon">
              <div style={{color: '#3e92cc', fontSize: '28px', fontWeight: 'bold'}}>🛡</div>
            </div>
            <h3 className="service-title">Insurance Coverage</h3>
            <p className="service-description">Get personalized insurance recommendations for health, life, auto, and property.
              Compare quotes from leading providers.</p>
          </div>
          <div className="service-card">
            <div className="service-icon">
              <div style={{color: '#3e92cc', fontSize: '28px', fontWeight: 'bold'}}>📈</div>
            </div>
            <h3 className="service-title">Stock Trading</h3>
            <p className="service-description">Access real-time market data, advanced analytics, and commission-free trading
              with our intuitive platform.</p>
          </div>
          <div className="service-card">
            <div className="service-icon">
              <div style={{color: '#3e92cc', fontSize: '28px', fontWeight: 'bold'}}>💼</div>
            </div>
            <h3 className="service-title">Portfolio Management</h3>
            <p className="service-description">Track, analyze, and optimize your investments with AI-powered recommendations
              tailored to your goals.</p>
          </div>
          <div className="service-card">
            <div className="service-icon">
              <div style={{color: '#3e92cc', fontSize: '28px', fontWeight: 'bold'}}>🔍</div>
            </div>
            <h3 className="service-title">Risk Assessment</h3>
            <p className="service-description">Understand your financial vulnerabilities and get custom strategies to protect
              your assets and investments.</p>
          </div>
        </div>
      </section>
    
      {/* Market Section */}
      <section className="market" id="market">
        <div className="container market-container">
          <div className="market-content">
            <h2>Stay Updated with Market Trends</h2>
            <p>Access real-time market data, comprehensive stock analytics, and expert financial insights to make informed
              investment decisions.</p>
            <p>Our advanced tracking tools allow you to monitor stocks across global markets, set custom alerts, and build
              diversified portfolios tailored to your financial goals.</p>
            <button className="btn">View Full Market</button>
          </div>
          <div className="stock-widget">
            <div className="stock-header">
              <div className="stock-title">Top Performers</div>
              <div className="stock-filter">
                <select>
                  <option>Today</option>
                  <option>This Week</option>
                  <option>This Month</option>
                </select>
              </div>
            </div>
            <div className="stock-list">
              <div className="stock-item">
                <div className="stock-name">AAPL</div>
                <div className="stock-price up">$185.92 <span>+1.72%</span></div>
              </div>
              <div className="stock-item">
                <div className="stock-name">MSFT</div>
                <div className="stock-price up">$328.79 <span>+0.94%</span></div>
              </div>
              <div className="stock-item">
                <div className="stock-name">GOOGL</div>
                <div className="stock-price down">$142.56 <span>-0.38%</span></div>
              </div>
              <div className="stock-item">
                <div className="stock-name">AMZN</div>
                <div className="stock-price up">$176.25 <span>+2.14%</span></div>
              </div>
              <div className="stock-item">
                <div className="stock-name">TSLA</div>
                <div className="stock-price down">$245.18 <span>-1.06%</span></div>
              </div>
            </div>
            <a href="#" className="view-more">View All Stocks</a>
          </div>
        </div>
      </section>
    
      {/* Call to Action */}
      <section className="call-to-action">
        <h2 className="cta-title">Have questions? Shoot us an email!</h2>
        <p className="cta-description">For any inquiries, collaborations, or support, please feel free to contact us. We look forward to connecting with you.</p>
        <a href="#" className="btn btn-accent">Contact Us</a>
      </section>
    
      {/* Testimonials */}
      <section className="testimonials">
        <div className="section-header">
          <h2 className="section-title">About Us</h2>
          <p className="section-subtitle">Meet the Minds Behind the Mission to Simplify Finance for Everyone.</p>
        </div>
        <div className="testimonial-cards">
          <div className="testimonial-card">
            <div className="testimonial-content">
              <p className="testimonial-text">Passionate frontend developer with a keen eye for design and user experience. Dedicated to building intuitive and responsive interfaces that make financial tools simple and accessible.</p>
              <div className="testimonial-author">
                <div className="author-avatar"></div>
                <div className="author-info">
                  <h4>Khushi Kshatriya</h4>
                  <p>Frontend Developer</p>
                </div>
              </div>
            </div>
          </div>
          <div className="testimonial-card">
            <div className="testimonial-content">
              <p className="testimonial-text">Passionate frontend developer with a keen eye for design and user experience. Dedicated to building intuitive and responsive interfaces that make financial tools simple and accessible.</p>
              <div className="testimonial-author">
                <div className="author-avatar"></div>
                <div className="author-info">
                  <h4>Samruddhi Narkhede</h4>
                  <p>Frontend Developer</p>
                </div>
              </div>
            </div>
          </div>
          <div className="testimonial-card">
            <div className="testimonial-content">
              <p className="testimonial-text">Passionate frontend developer with a keen eye for design and user experience. Dedicated to building intuitive and responsive interfaces that make financial tools simple and accessible.</p>
              <div className="testimonial-author">
                <div className="author-avatar"></div>
                <div className="author-info">
                  <h4>Prachi Mehetre</h4>
                  <p>Frontend Developer</p>
                </div>
              </div>
            </div>
          </div>
          <div className="testimonial-card">
            <div className="testimonial-content">
              <p className="testimonial-text">Passionate frontend developer with a keen eye for design and user experience. Dedicated to building intuitive and responsive interfaces that make financial tools simple and accessible.</p>
              <div className="testimonial-author">
                <div className="author-avatar"></div>
                <div className="author-info">
                  <h4>Divya Bhavsar</h4>
                  <p>Frontend Developer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
