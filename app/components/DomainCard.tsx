import { IDomainIcons, Domain } from "@/lib/types";
import { Flex, Icon, Link, Text } from "@chakra-ui/react";
import HttpIcon from "@mui/icons-material/Http";
import AppleIcon from "@mui/icons-material/Apple";
import BrushIcon from "@mui/icons-material/Brush";
import AndroidIcon from "@mui/icons-material/Android";
import InsightsIcon from "@mui/icons-material/Insights";
import CurrencyBitcoinIcon from "@mui/icons-material/CurrencyBitcoin";

const domainIcons: IDomainIcons = {
  web: HttpIcon,
  ios: AppleIcon,
  ml: InsightsIcon,
  design: BrushIcon,
  android: AndroidIcon,
  blockchain: CurrencyBitcoinIcon,
};

export default function DomainCard({
  domain,
  toBeGrayed,
}: {
  domain: Domain;
  toBeGrayed: Boolean;
}) {
  return (
    <Link
      href={`dashboard/${domain}`}
      pointerEvents={toBeGrayed ? "none" : "auto"}
    >
      <Flex
        p="1rem"
        borderRadius="1rem"
        gap="1rem"
        alignItems="center"
        color="#9FB4B6"
        _hover={{
          color: "white",
          transition: "all 0.2s ease-in-out",
        }}
        cursor="pointer"
        bg={toBeGrayed ? "rgba(255,255,255,0.3)" : "initial"}
      >
        <Icon as={domainIcons[domain]} />
        <Text>{domain}</Text>
      </Flex>
    </Link>
  );
}
