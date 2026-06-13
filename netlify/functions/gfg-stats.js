const PROFILE_URL = "https://www.geeksforgeeks.org/profile/surfe6mip";

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
  "Content-Type": "application/json",
};

const extractSolvedCount = (html) => {
  const match = html.match(/\\?"total_problems_solved\\?"\s*:\s*(\d+)/);
  return match ? Number(match[1]) : null;
};

export const handler = async () => {
  try {
    const response = await fetch(PROFILE_URL, {
      headers: {
        "User-Agent": "Mozilla/5.0 HarshitShekhawatPortfolio/1.0",
        Accept: "text/html,application/xhtml+xml",
      },
    });

    if (!response.ok) {
      throw new Error(`GeeksforGeeks responded with ${response.status}`);
    }

    const html = await response.text();
    const totalProblemsSolved = extractSolvedCount(html);

    if (typeof totalProblemsSolved !== "number") {
      throw new Error("Unable to find total solved count");
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        totalProblemsSolved,
        profileUrl: PROFILE_URL,
      }),
    };
  } catch (error) {
    return {
      statusCode: 502,
      headers,
      body: JSON.stringify({
        error: error instanceof Error ? error.message : "Unable to fetch GeeksforGeeks stats",
      }),
    };
  }
};
