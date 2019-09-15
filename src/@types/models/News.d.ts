interface INews {
  title: string;
  content: string;
  tags: ITag[];
  link?: IExternalLink;
  createdDate: number;
  key: string;
}

interface ITag {
  highlight: boolean;
  children: string;
  key: string;
}

interface IExternalLink {
  href: string;
  title?: string;
  img?: string;
}
