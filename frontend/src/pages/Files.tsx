import React from "react";
import {Box,Grid,Heading,Stack,HStack,Spacer, Flex, Avatar, Tooltip,Tabs,Tab,TabList,TabPanels,TabPanel,Popover,PopoverArrow,PopoverBody,PopoverContent,PopoverTrigger, Button} from  "@chakra-ui/react";

const Files:React.FC = () => {
  const [Width,SetWidth] = React.useState<string>(window.innerWidth.toString()+'px');
  window.onresize=()=>{
    SetWidth(window.innerWidth.toString()+'px');
  }
  return (
  <>
  <Stack w={Width}  overflow={'hidden'}>
    <Flex
      maxHeight={'10vh'}  
      minWidth={'100%'} 
      padding={'10px'}
      boxSizing={'border-box'}
      bg={"purple.500"}
      alignItems={'center'}
    >
      <Heading 
        children={'Cloud_Bucket'} 
        as="h2"
      />
      <Spacer/>
      <HStack spacing={'10px'} alignItems={'center'}>
        <Tooltip label = {'sage-adebayo'}>
          <Popover>
            <PopoverTrigger>
              <Avatar src='https://bit.ly/sage-adebayo'/>
            </PopoverTrigger>
            <PopoverContent borderRadius={'10px'}>
              <PopoverArrow />
              <PopoverBody 
                bg='purple.300' 
                borderRadius={'10px'}
                children={
                <Button 
                  children={'go to account Settings'}
                />}
              />
            </PopoverContent>
          </Popover>
        </Tooltip>
      </HStack>  
    </Flex>
    <Tabs  variant='line' colorScheme="purple">
      <TabList height={'5vh'}>
        <Tab fontWeight={'700'}>{'One'}</Tab>
        <Tab>{'Two'}</Tab>
        <Tab>{'three'}</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <Grid 
            h={'80vh'}
            templateColumns={'repeat(auto-fill,min(320px,90%))'}
            autoRows={'250px'}
            style={{width:'100%',overflow:'auto'}}
            gap={'10px'}
            justifyContent={'space-evenly'}
          >
            <Box children={'hello'} border={'1px solid red'}/>
            <Box children={'hello'} border={'1px solid red'}/>
            <Box children={'hello'} border={'1px solid red'}/>
            <Box children={'hello'} border={'1px solid red'}/>
            <Box children={'hello'} border={'1px solid red'}/>
            <Box children={'hello'} border={'1px solid red'}/>
            <Box children={'hello'} border={'1px solid red'}/>
            <Box children={'hello'} border={'1px solid red'}/>

          </Grid>
        </TabPanel>
        <TabPanel>
        <Grid 
            h={'80vh'}
            templateColumns={'repeat(auto-fill,min(320px,90%))'}
            autoRows={'250px'}
            style={{width:'100%',overflow:'auto'}}
            gap={'10px'}
            justifyContent={'space-evenly'}
          >
            <Box children={'hello2'} border={'1px solid red'} textAlign={'center'}/>
            <Box children={'hello'} border={'1px solid red'}/>
            <Box children={'hello'} border={'1px solid red'}/>
            <Box children={'hello2'} border={'1px solid red'}/>
            <Box children={'hello2'} border={'1px solid red'}/>
            <Box children={'hello'} border={'1px solid red'}/>
            <Box children={'hello'} border={'1px solid red'}/>
            <Box children={'hello2'} border={'1px solid red'}/>

          </Grid>
        </TabPanel>
        <TabPanel>
        <Grid 
            h={'80vh'}
            templateColumns={'repeat(auto-fill,min(320px,90%))'}
            autoRows={'250px'}
            style={{width:'100%',overflow:'auto'}}
            gap={'10px'}
            justifyContent={'space-evenly'}
          >
            <Box children={'hello3'} border={'1px solid red'}/>
            <Box children={'hello'} border={'1px solid red'}/>
            <Box children={'hello'} border={'1px solid red'}/>
            <Box children={'hello3'} border={'1px solid red'}/>
            <Box children={'hello3'} border={'1px solid red'}/>
            <Box children={'hello'} border={'1px solid red'}/>
            <Box children={'hello'} border={'1px solid red'}/>
            <Box children={'hello3'} border={'1px solid red'}/>

          </Grid>
        </TabPanel>
      </TabPanels>
    </Tabs>
    
  </Stack>
  </>
  );
}
export default Files;