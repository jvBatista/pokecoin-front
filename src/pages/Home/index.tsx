import { CurrencyBtc } from "phosphor-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { OperationButton } from "../../components/OperationButton";
import { DolarStatus } from "../../components/DolarStatus";
import { getCurrentDolarValue } from "../../services/coinApi";
import {
    CenterSection,
    Container,
    HomeSubTitle,
    HomeText,
    HomeTitle,
    OperationsContainer,
    TopSection
} from "./style";

const EXP_TO_BTC = 0.00000001;

export function Home() {
    const [collectionValue, setCollectionValue] = useState(0);
    const [dolarValue, setDolarValue] = useState(0);
    const navigate = useNavigate();

    const getCollectionValue = async () => {
        const amount = await getCurrentDolarValue();
        setDolarValue(amount);

        const data = sessionStorage.getItem("@pokecoin/userCollection") || "";
        const collection = JSON.parse(data);
        let currentCollectionValue = 0;
        collection.forEach((element: { base_experience: any; }) => currentCollectionValue += element.base_experience)
        setCollectionValue(currentCollectionValue);
    };

    useEffect(() => {
        getCollectionValue();
    }, []);

    return (
        <Container>
            <TopSection>
                <DolarStatus />
            </TopSection>

            <CenterSection>
                <HomeSubTitle>MINHA CARTEIRA</HomeSubTitle>
                <HomeTitle>{`${collectionValue*EXP_TO_BTC} `} <CurrencyBtc size={72} /></HomeTitle>

                <HomeText>{`(~ $ ${Number(collectionValue * dolarValue * EXP_TO_BTC).toFixed(2)})`}</HomeText>
            </CenterSection>

            <OperationsContainer>
                <OperationButton
                    operation="shop"
                    text="Registrar Aquisição"
                    buttonFunction={() => navigate("/trade")}
                />

                <OperationButton
                    operation="sell"
                    text="Registrar Venda"
                    buttonFunction={() => navigate("/sell")}
                />
                
                <OperationButton
                    operation="history"
                    text="Histórico de Operações"
                    buttonFunction={() => navigate("/trade")}
                />
            </OperationsContainer>


        </Container>
    )
}