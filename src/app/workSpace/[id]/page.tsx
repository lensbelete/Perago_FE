"use client";

import WorkSpaceSideBar from "@/components/WorkSpaceSideBar";
import { useParams } from "next/navigation";
import SearchBar from "@/components/SearchBar";
import { IconTable, IconChevronDown, IconDownload } from "@tabler/icons-react";
import { Button, Menu, Table, Drawer } from "@mantine/core";

import CreateTableDrawer from "@/components/CreateTableDrawer";
import { useState, useEffect } from "react";
import AddColumnModal from "@/components/AddColumnModal";
import { IconPlus } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";

import useTables from "@/hooks/tableHooks";
import useTableStore, { TableInterface } from "@/zustandStore/tableStore";
import { getModelColumns } from "@/services/columnService";
import { useColumnStore } from "@/zustandStore/columnStore";
import {
  addGenerateJob,
  downloadProject,
  openWebSocket,
} from "@/services/extractService";

const Page = () => {
  const [opened, { open, close }] = useDisclosure(false);

  const { id } = useParams();
  const projectId = id;

  const { data, isLoading } = useTables(projectId.toString());

  const {
    tables: storeTables,
    isLoading: storeLoading,
    setTables,
  } = useTableStore();

  useEffect(() => {
    setTables(data as TableInterface[]);
  }, [isLoading]);

  const [tableId, setTableId] = useState();
  const [isDisabled, setDisabled] = useState(true);
  const [jobId, setJobId] = useState("");

  const { columns, setColumns } = useColumnStore();

  const notifyUser = (jobId: string) => {
    alert(
      "The generation of your task has been done! You can now use the `Download Code` button."
    );
    setDisabled(false);
    setJobId(jobId);
  };

  const handleButtonClick = async (event) => {
    const buttonId = event.currentTarget.id;
    const tableId = buttonId;

    try {
      const apiColumns = await getModelColumns(tableId);
      console.log(apiColumns);
      setTableId(tableId);
      setColumns(apiColumns);
    } catch (err) {
      console.log(err);
    }

    console.log(`Button with ID ${tableId} was clicked`);
  };

  const handleGenerateClick = async (event) => {
    try {
      setDisabled(true);
      const response = await addGenerateJob(projectId as string);
      alert(response.message);
      openWebSocket(response.jobId, notifyUser);
    } catch (error) {
      alert("Couldn't place job");
    }
  };

  const handleDownloadClick = () => {
    downloadProject(jobId);
  };

  return (
    <div className="grid-cols-custom">
      <div className="h-screen bg-green-900 border border-r-2">
        <WorkSpaceSideBar />
      </div>

      <div className="h-screen bg-gray-200 border-r-2 border-white">
        <div className="border border-b-2 border-b-white h-14">
          <p className="p-3 text-3x1 font-semibold text-green-700">
            Table Editor
          </p>
        </div>

        <div className="justify-center">
          <SearchBar />
          <div className="flex justify-center border border-r-2 border-b-white">
            <Drawer
              opened={opened}
              onClose={close}
              position="right"
              size="40rem"
              title="Create a new table"
              overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
            >
              <CreateTableDrawer
                isOpen={open}
                onClose={close}
                projectId={projectId}
              />
            </Drawer>
            <Button
              className="mb-4"
              leftSection={<IconPlus size={14} />}
              color="green"
              size="xs"
              onClick={open}
            >
              New Table
            </Button>
          </div>

          <div className="grid-cols-1">
            {storeTables?.length > 0 && (
              <div>
                {storeTables.map(
                  (table) =>
                    table && (
                      <Button
                        justify="left"
                        fullWidth
                        color="green"
                        leftSection={<IconTable />}
                        variant="transparent"
                        key={table.id}
                        onClick={handleButtonClick}
                        id={table.id}
                      >
                        {table.name}
                      </Button>
                    )
                )}
              </div>
            )}
          </div>
          {storeTables?.length > 0 && (
            <div className="flex justify-center position-relative">
              <Button color="green" onClick={handleGenerateClick}>
                Generate Code
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="h-screen">
        {/* we will write the colomun code here */}

        <div className="relative h-14 bg-gray-200 border-b-2 border-white">
          <div className="absolute right-2 top-2">
            <Button
              rightSection={<IconDownload />}
              variant="transparent"
              color="green"
              disabled={isDisabled}
              onClick={handleDownloadClick}
            >
              Download Code
            </Button>
          </div>
        </div>
        <div>
          {tableId && (
            <Table striped highlightOnHover withTableBorder withColumnBorders>
              <Table.Thead>
                <tr>
                  {columns.map((column, index) => (
                    <Table.Th key={column.id}>
                      <span>{column.name}</span>
                      <Menu shadow="md" width={200}>
                        <Menu.Target>
                          <Button variant="transparent">
                            <IconChevronDown color="green" size={20} />
                          </Button>
                        </Menu.Target>

                        <Menu.Dropdown>
                          <Menu.Label></Menu.Label>
                          <Menu.Item>type: {column.type}</Menu.Item>
                          <Menu.Item>primary key: {column.isPrimary}</Menu.Item>
                        </Menu.Dropdown>
                      </Menu>
                    </Table.Th>
                  ))}

                  {
                    <div>
                      <Table.Th key="addButton">
                        <AddColumnModal
                          projectId={projectId as string}
                          id={tableId ?? ""}
                        />
                      </Table.Th>
                    </div>
                  }
                </tr>
              </Table.Thead>
            </Table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
