import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

interface ProductData {
    PropertyId: number;
    DealsFound: number;
    DealWeight: number;
    MaxDiscountPercent: number;
    AvgDiscountPercent: number;
    ReferencePrice: number;
    ReferencePriceCurrency: string;
    PropertyName: string;
    PropertyAddress: string;
    LocationId: number;
    PropertyLatitude: number;
    PropertyLongitude: number;
    PropertyImageUrl: string;
    PropertyImageUrlHighRes: string;
    PropertyRating: string;
    TripAdvisorRating: number;
    TripAdvisorReviewCount: number;
    RatingImageUrl: string;
    CheckIn: string;
    CheckOut: string;
}

const Product = () => {
    const { hotelId } = useParams();
    const [productData, setProductData] = useState<ProductData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProductData = async () => {
            try {
                if (hotelId) {
                    const response = await axios.get(`http://localhost:5000/api/products/${hotelId}`);
                    console.log("Dane z API:", response.data);
                    setProductData(response.data);
                } else {
                    setError('Brak identyfikatora hotelu.');
                }
                setLoading(false);
            } catch (err) {
                console.error('Błąd podczas pobierania danych:', err);
                setError('Nie udało się pobrać danych. Spróbuj ponownie.');
                setLoading(false);
            }
        };

        fetchProductData();
    }, [hotelId]);

    if (loading) {
        return <div>Ładowanie...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!productData) {
        return <div>Brak danych do wyświetlenia</div>;
    }

    return (
        <div className="product-container">
            <h1>{productData.PropertyName}</h1>
            <img
                src={`https:${productData.PropertyImageUrlHighRes}`}
                alt={productData.PropertyName}
                style={{ width: '100%', height: 'auto' }}
            />
            <p>{productData.PropertyAddress}</p>
            <p>Ocena: {productData.PropertyRating} (TripAdvisor: {productData.TripAdvisorRating} stars)</p>
            <p>Cena referencyjna: {productData.ReferencePrice} {productData.ReferencePriceCurrency}</p>
            <p>Największy możliwy rabat: {productData.MaxDiscountPercent}%</p>
            <p>Średni rabat: {productData.AvgDiscountPercent}%</p>
            <p>Liczba ofert: {productData.DealsFound}</p>
            <p>Data przyjazdu: {productData.CheckIn}</p>
            <p>Data wyjazdu: {productData.CheckOut}</p>
            <p>Współrzędne: {productData.PropertyLatitude}, {productData.PropertyLongitude}</p>
            <img
                src={`https:${productData.RatingImageUrl}`}
                alt="Ocena"
                style={{ width: '50px', height: 'auto' }}
            />
            <p>Recenzje na TripAdvisor: {productData.TripAdvisorReviewCount}</p>
        </div>
    );
};

export default Product;
