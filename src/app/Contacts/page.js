"use client";
import { useState } from "react";
import axios from "axios";
import Map from "../Map/Map";
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import { DoneOutlineOutlined } from "@mui/icons-material";
import { useTheme } from "@mui/material";
import { useGetPokemonByNameQuery } from "../Api/pokemon.js";

const page = () => {
    const theme = useTheme()
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    const action = (
        <>

            <IconButton
                size="small"
                aria-label="close"
                onClick={handleClose}
                sx={{ color: 'black' }}
            >
                <DoneOutlineOutlined fontSize="small" />
            </IconButton>
        </>
    );
    const [formData, setFormData] = useState({ name: "", phone: "", email: "", message: "" });
    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("");
        setLoading(true);

        try {
            const res = await axios.post("/apis/sendMail", formData);
            if (res.data.success) {
                setStatus("Message sent successfully!");
                handleClick();
                setFormData({ name: "", phone: "", email: "", message: "" });
            } else {
                setStatus("❌ Something went wrong.");
            }
        } catch (err) {
            setStatus("❌ Failed to send message.");
        } finally {
            setLoading(false);
        }
    };
    const { data, error, isLoading } = useGetPokemonByNameQuery('tivoras?populate=*');

    const headerData = data?.data?.[0];[]
    return (
        <>
            <Map />
            <div className="container py-5">
                <div className="row g-5 align-items-start">
                    {/* Left Section */}
                    <div className="col-12 col-md-5">
                        <p className="text-danger fw-bold text-uppercase mb-2">{headerData?.info}</p>
                        <h1 className="fw-bold mb-3">{headerData?.contactUs}</h1>
                        <p className="mb-4" style={{ fontSize: "14px", color: theme.palette.text.primary }}>
                            {headerData?.contactsInfo}
                        </p>
                        {headerData?.locations.map((item, index) => {
                            return (
                                <div key={index} className="mb-4">
                                    <h5 className="fw-bold">{item.name}</h5>
                                    <p className="mb-1">{item.address}</p>
                                    <p className="">{item.phone}</p>
                                </div>
                            )
                        })}



                        {/* <div>
                            <h5 className="fw-bold">Mansoura</h5>
                            <p className="mb-1">109 Avenue Léon, 63 Clermont-Ferrand</p>
                            <p className="">+201012938712</p>
                        </div> */}
                    </div>

                    {/* Right Section - Form */}
                    <div className="col-12 col-md-7">
                        <div className="card shadow-sm p-4">
                            <h4 className="mb-4">{headerData?.sendMsg}</h4>
                            <form onSubmit={handleSubmit}>
                                {/* Name & Phone */}
                                <div className="row g-3 mb-3">
                                    <div className="col-12 col-md-6">
                                        <input
                                            type="text"
                                            name="name"
                                            className="form-control"
                                            placeholder="Name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <input
                                            type="tel"
                                            name="phone"
                                            className="form-control"
                                            placeholder="Phone"
                                            pattern="[0-9]*"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Email alone */}
                                <div className="mb-3">
                                    <input
                                        type="email"
                                        name="email"
                                        className="form-control"
                                        placeholder="Email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                {/* Message */}
                                <div className="mb-3">
                                    <textarea
                                        name="message"
                                        className="form-control"
                                        rows="5"
                                        placeholder="Message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                    ></textarea>
                                </div>

                                {/* Submit */}
                                <button
                                    type="submit"
                                    className="btn btn-dark fw-bold w-100"
                                    disabled={loading}
                                >
                                    {loading ? headerData?.sending : headerData?.sendMssg}
                                </button>

                                {/* Status */}

                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message={status}
                action={action}
                className="p-0 rounded"
                sx={{
                    backgroundColor: theme.palette.background.snackBG,
                    width: "fit-content",
                    ".css-12nna4x-MuiPaper-root-MuiSnackbarContent-root": {
                        backgroundColor: theme.palette.background.snackBG,
                        color: "#FFF",
                    }
                }}
            />
        </>
    );
};

export default page;
