import { CreditCard } from "../creditCard";

export interface Payment{
    creditCard:CreditCard;
    amount:number;
}