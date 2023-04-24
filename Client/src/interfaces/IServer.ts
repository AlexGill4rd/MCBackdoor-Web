export default interface IServer {
  id: number;
  ip_address: string;
  port: number;
  motd: string;
  players_max: number;
  players_online: number;
  host_environment: string;
  cores: number;
  server_software: string;
  software_version: string;
  java_version: string;
  max_memory: number;
  os_arch: string;
  os_name: string;
  os_version: string;
  favicon: string;
  infect_date: Date;
  last_ping: Date;
  state: boolean;
}
