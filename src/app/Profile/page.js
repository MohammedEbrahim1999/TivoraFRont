"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Container, Row, Col, Nav, Button, Card } from "react-bootstrap";
import { FaUser, FaBox, FaHeart, FaCog, FaEdit } from "react-icons/fa";
import LogoutIcon from "@mui/icons-material/Logout";

export default function ProfileDashboard() {
  const [user, setUser] = useState(null);
  const [tabKey, setTabKey] = useState("profile");
  const router = useRouter();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("currentUser"));
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    if (storedUser && isLoggedIn) setUser(storedUser);
    else router.push("/Signin");
  }, [router]);

  const handleLogout = () => {
    localStorage.setItem("isLoggedIn", false);
    localStorage.setItem("currentUser", []);
    router.push("/Signin");
  };

  if (!user) {
    return (
      <Container className="vh-100 d-flex justify-content-center align-items-center">
        <p>Loading Profile...</p>
      </Container>
    );
  }

  const tabs = [
    {
      key: "profile", label: "Profile", icon: <FaUser />, content: (
        <>
          <h4 className="section-title">User Information</h4>
          <hr />
          <p><strong>First Name:</strong> {user.firstName}</p>
          <p><strong>Last Name:</strong> {user.lastName}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <Button className="btn-gradient d-flex align-items-center mt-3" style={{
            width: "fit-content"
          }}>
            <FaEdit className="me-2" /> Edit Profile
          </Button>
        </>
      )
    },
    {
      key: "orders", label: "Orders", icon: <FaBox />, content: (
        <>
          <h4 className="section-title">Your Orders</h4>
          <hr />
          <Card className="p-3 mb-3 order-card">
            <h6 className="fw-semibold">Order #12345</h6>
            <p>Status: <span className="text-success">Delivered</span></p>
            <p>Total: $199.99</p>
          </Card>
          <p className="text-muted">No more orders.</p>
        </>
      )
    },
    {
      key: "wishlist", label: "Wishlist", icon: <FaHeart />, content: (
        <>
          <h4 className="section-title">Wishlist</h4>
          <hr />
          <Card className="p-3 mb-3 wishlist-card">
            <h6 className="fw-semibold">Smart Watch</h6>
            <p>Price: $99.99</p>
            <Button size="sm" variant="primary" style={{width: "fit-content"}}>View</Button>
          </Card>
          <p className="text-muted">No more items in wishlist.</p>
        </>
      )
    },
    {
      key: "settings", label: "Settings", icon: <FaCog />, content: (
        <>
          <h4 className="section-title">Settings</h4>
          <hr />
          <Button variant="secondary" style={{width:"fit-content"}}>Change Password</Button>
          <Button variant="danger" className="d-flex align-items-center gap-2 mt-2" onClick={handleLogout} style={{width:"fit-content"}}>
            <LogoutIcon /> Log Out
          </Button>
        </>
      )
    },
  ];

  return (
    <Container fluid className="vh-100 p-0" style={{ fontFamily: "Inter, sans-serif" }}>
      <Row className="h-100">
        {/* Sidebar */}
        <Col xs={12} md={3} className="d-flex flex-column text-white sidebar">
          <div className="profile-avatar mb-3">
            {user.firstName?.charAt(0)}
            {user.lastName?.charAt(0)}
          </div>
          <h5 className="text-center text-dark mb-4 fw-semibold">
            {user.firstName} {user.lastName}
          </h5>

          <Nav className="flex-column align-items-center w-100 px-3">
            {tabs.map((tab) => (
              <Nav.Link
                key={tab.key}
                active={tabKey === tab.key}
                onClick={() => setTabKey(tab.key)}
                className={`d-flex align-items-center gap-2 px-3 py-2 my-1 rounded-3 nav-item-custom 
                  }`}
               style={{
  backgroundColor: tabKey === tab.key ? "rgba(0, 123, 255, 0.1)" : "transparent",
}}


              >
                {tab.icon} {tab.label}
              </Nav.Link>
            ))}
          </Nav>

          <Button
            variant="outline-light"
            onClick={handleLogout}
            className="mt-auto mb-4 px-4 d-flex align-items-center gap-2 logout-btn"
          >
            <LogoutIcon /> Log Out
          </Button>
        </Col>

        {/* Main Content */}
        <Col xs={12} md={9} className="p-5 main-area">
          <Card className="glass-card shadow-lg">
            {/* Top Tabs */}
            <Nav variant="tabs" activeKey={tabKey} className="mb-4">
              {tabs.map((tab) => (
                <Nav.Item key={tab.key}>
                  <Nav.Link
                    eventKey={tab.key}
                    onClick={() => setTabKey(tab.key)}
                    className="d-flex align-items-center gap-2 tab-link"
                  >
                    {tab.icon}
                    {tab.label}
                  </Nav.Link>
                </Nav.Item>
              ))}
            </Nav>

            {/* Dynamic Tab Content */}
            {tabs.find((tab) => tab.key === tabKey)?.content}
          </Card>
        </Col>
      </Row>

      {/* Styles */}
      <style>{`
        .sidebar {
          background: linear-gradient(180deg, #f9f9f9, #e0f7fa, #b2ebf2);
          padding-top: 3rem;
        }
        .profile-avatar {
          width: 110px;
          height: 110px;
          border-radius: 50%;
          background: linear-gradient(135deg, #6a11cb, #2575fc);
          display: flex;
          justify-content: center;
          align-items: center;
          color: white;
          font-size: 2.5rem;
          font-weight: bold;
          box-shadow: 0 8px 20px rgba(0,0,0,0.25);
          margin: 0 auto;
        }
        .glass-card {
          background: #fff;
          border-radius: 20px;
          padding: 2rem;
        }
        .tab-link {
          font-weight: 600;
          color: #6b7280;
          transition: all 0.2s ease;
        }
        .tab-link.active, .tab-link:hover {
          color: #2575fc !important;
        }
        .nav-item-custom {
          transition: all 0.2s;
          
        }
        .active-tab {
          background-color: rgba(255,255,255,0.15) !important;
          border-radius: 10px;
          font-weight: 600;
          
        }
        .btn-gradient {
          background: linear-gradient(90deg, #6a11cb, #2575fc);
          border: none;
          color: white;
          font-weight: 500;
          padding: 0.6rem 1.2rem;
          border-radius: 10px;
          transition: all 0.3s;
        }
        .btn-gradient:hover {
          opacity: 0.9;
          transform: translateY(-2px);
        }
        .logout-btn {
          border-radius: 10px;
          border: 1.5px solid rgba(255,255,255,0.7);
          transition: all 0.3s ease;
        }
        .logout-btn:hover {
          background: rgba(255,255,255,0.2);
        }
        .section-title {
          color: #2575fc;
          font-weight: 600;
          margin-bottom: 1rem;
        }
        .order-card, .wishlist-card {
          border-radius: 12px;
          border: 1px solid #e5e7eb;
          transition: all 0.2s;
        }
        .order-card:hover, .wishlist-card:hover {
          box-shadow: 0 6px 18px rgba(0,0,0,0.1);
          transform: translateY(-2px);
        }
      `}</style>
    </Container>
  );
}
