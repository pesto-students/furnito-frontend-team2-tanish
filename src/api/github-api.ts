import axios from "axios";
import parseLink, { Links } from "parse-link-header";

export interface Label {
  id: number;
  name: string;
  color: string;
}

export interface User {
  login: string;
  avatar_url: string;
}

export interface Issue {
  id: number;
  title: string;
  number: number;
  user: User;
  body: string;
  labels: Label[];
  comments_url: string;
  state: "open" | "closed";
  comments: number;
}

export interface RepoDetails {
  id: number;
  name: string;
  full_name: string;
  open_issues_count: number;
}

export interface Comment {
  id: number;
  body: string;
  user: User;
  created_at: string;
  updated_at: string;
}

export interface IssuesResult {
  pageLinks: Links | null;
  pageCount: number;
  issues: Issue[];
}

const isLastPage = (pageLinks: Links) => {
  return (
    Object.keys(pageLinks).length === 2 && pageLinks.first && pageLinks.prev
  );
};

const getPageCount = (pageLinks: Links) => {
  if (!pageLinks) {
    return 0;
  }
  if (isLastPage(pageLinks)) {
    return parseInt(pageLinks.prev.page, 10) + 1;
  }
  if (pageLinks.last) {
    return parseInt(pageLinks.last.page, 10);
  }
  return 0;
};

export async function getIssues(
  org: string,
  repo: string,
  page = 1,
): Promise<IssuesResult> {
  const url = `https://api.github.com/repos/${org}/${repo}/issues?per_page=25&page=${page}`;

  // eslint-disable-next-line no-useless-catch
  try {
    const issuesResponse = await axios.get<Issue[]>(url);
    let pageCount = 0;
    const pageLinks = parseLink(issuesResponse.headers.link);

    if (pageLinks !== null) {
      pageCount = getPageCount(pageLinks);
    }

    return {
      pageLinks,
      pageCount,
      issues: issuesResponse.data,
    };
  } catch (err) {
    throw err;
  }
}

export async function getIssue(org: string, repo: string, number: number) {
  const url = `https://api.github.com/repos/${org}/${repo}/issues/${number}`;

  const { data } = await axios.get<Issue>(url);
  return data;
}
