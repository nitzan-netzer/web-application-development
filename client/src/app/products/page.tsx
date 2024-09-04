import React from "react";
import { Col, Row } from "react-bootstrap";
import ProductsCards from "@/srccomponents/ProductsCard";

export default function Products() {
    return (
        <div className="App">
            <main>
                <ProductsCards />
            </main>
        </div>
    );
}