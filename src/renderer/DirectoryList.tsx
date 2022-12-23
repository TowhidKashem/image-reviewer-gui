import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { SimpleGrid, Flex, Heading, Icon } from '@chakra-ui/react';
import { FcFolder } from 'react-icons/fc';
import { PathNav } from './PathNav';
import { AppContext, channels } from './_data';
import { getDirName } from './_utils';

export function DirectoryList() {
  const navigate = useNavigate();

  const { directories, setDirectoryPath } = useContext(AppContext);

  const handleFolderClick = (directoryPath: string) => {
    window.electron.ipcRenderer.sendMessage(channels.GET_IMAGES, {
      directory: directoryPath
    });
    navigate('/dir/content', { replace: true });
    setDirectoryPath(directoryPath);
  };

  return (
    <>
      <PathNav onBackClick={() => {}} />

      <SimpleGrid
        background="#333"
        spacing={2}
        columns={{
          sm: 2,
          md: 5,
          lg: 10
        }}
      >
        {directories?.map((directoryPath) => (
          <Flex
            key={directoryPath}
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            padding={3}
            _hover={{
              background: 'rgba(0, 0, 0, 0.3)',
              borderRadius: 10,
              cursor: 'pointer'
            }}
            onClick={() => handleFolderClick(directoryPath)}
          >
            <Icon as={FcFolder} fontSize="4rem" marginBottom={1} />

            <Heading color="gray.50" as="h6" size="xs">
              {getDirName(directoryPath)}
            </Heading>
          </Flex>
        ))}
      </SimpleGrid>
    </>
  );
}
