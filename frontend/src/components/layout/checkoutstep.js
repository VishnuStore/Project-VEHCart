import { Link } from "react-router-dom";

export default function ChechoutStep({ Shipping, PlaceOrder, ConfirmOrder }) {
    return (
        <div className="checkout-progress flex justify-center">
            {Shipping ?
                <Link to={"/Shipping"}>
                    <div className="triangle2-active"></div>
                    <div className="step active-step">Shipping Info</div>
                    <div className="triangle-active"></div>
                </Link> :
                <Link to={"/Shipping"}>
                    <div className="triangle2-incomplete"></div>
                    <div className="step incomplete">Shipping Info</div>
                    <div className="triangle-incomplete"></div>
                </Link>
            }
             {ConfirmOrder ?
                <Link to={"/Order/Confirm"}>
                    <div className="triangle2-active"></div>
                    <div className="step active-step">Confirm Order</div>
                    <div className="triangle-active"></div>
                </Link> :
                <Link to={"/Order/Confirm"}>
                    <div className="triangle2-incomplete"></div>
                    <div className="step incomplete">confirm Order</div>
                    <div className="triangle-incomplete"></div>
                </Link>
            }
             { PlaceOrder?
                <Link to={"/Placed-Order"}>
                    <div className="triangle2-active"></div>
                    <div className="step active-step">Placed Order</div>
                    <div className="triangle-active"></div>
                </Link> :
                <Link to={"/Placed-Order"}>
                    <div className="triangle2-incomplete"></div>
                    <div className="step incomplete">Placed Order</div>
                    <div className="triangle-incomplete"></div>
                </Link>
            }
        </div>
    )
}