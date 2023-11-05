import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import Following from "./Following";
import Followers from "./Followers";

export default function FollowsTab() {
	return (
		<Box color="gray.100">
			<Tabs variant="soft-rounded" colorScheme="green">
				<TabList>
					<Tab>Following</Tab>
					<Tab>Follower</Tab>
				</TabList>

				<TabPanels>
					<TabPanel>
						<Following />
					</TabPanel>
					<TabPanel>
						<Followers />
					</TabPanel>
				</TabPanels>
			</Tabs>
		</Box>
	);
}
