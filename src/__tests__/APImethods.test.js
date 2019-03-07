import { setToken, getToken } from "../APIconnection/APImethods";
import sinon from "sinon";

// const fakeFetchComponent = ({})=>{
// 	render(<FetchMock mocks={{}}></FetchMock>)
// }
it("Properly extracts both general authToken and the specific SDK one from the given window.location.href", () =>
  expect(setToken("http://lolz.com/access_token=123lolz&token")).toEqual({
    auth: "Bearer 123lolz",
    tokenSDK: "123lolz"
  }));

window.location = "http://lolz.com";
it("Performs a correct redir calculation.", () => {
  sinon.stub(window.location, "assign");
  console.log(window.location.href);
  expect(getToken(/^(https?.+(\d*|\.\D+))\//g)).toBe(
    "https:accounts.spotify.com/authorize?client_id=1234&scope=playlist-read-private%20playlist-modify-private%20playlist-modify-public%20playlist-read-collaborative%20user-modify-playback-state%20user-read-currently-playing%20user-read-playback-state%20user-top-read%20user-read-recently-played%20app-remote-control%20streaming%20user-read-birthdate%20user-read-email%20user-read-private%20user-follow-read%20user-follow-modify%20user-library-modify%20user-library-read&response_type=token&redirect_uri=http://localhost/callback"
  );
});
