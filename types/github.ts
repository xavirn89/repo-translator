export interface RepositoryItem {
  name: string
  path: string
  sha: string
  size: number
  url: string
  html_url: string
  git_url: string
  download_url: string
  type: string
  _links: RepositoryItemLinks
}

export interface RepositoryItemLinks {
  self: string
  git: string
  html: string
}
