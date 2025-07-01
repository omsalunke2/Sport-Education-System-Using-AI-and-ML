import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useSelector } from "react-redux";

const RoomPage = () => {
  const { user } = useSelector((state) => state.user);
  const { roomId } = useParams();
  const meetingRef = useRef(null);

  useEffect(() => {
    const initMeeting = async () => {
      if (!meetingRef.current) return;

      const appID = 1119991377;
      const serverSecret = "0e77d84ed31fdbb225cf51dabae2563c"; // Move this to backend for security
      const userID = user?._id || Date.now().toString(); // Prefer user._id
      const userName = user?.fullName || "Guest";

      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        roomId,
        userID,
        userName
      );

      const zc = ZegoUIKitPrebuilt.create(kitToken);
      zc.joinRoom({
        container: meetingRef.current,
        sharedLinks: [
          {
            name: "Copy Link",
            url: `${window.location.origin}/room/${roomId}`, // Dynamic link
          },
        ],
        scenario: {
          mode: ZegoUIKitPrebuilt.VideoConference, // Use VideoConference mode
        },
        showScreenSharingButton: true, // Enable screen sharing
        showLeavingView: true, // Ensure UI updates when leaving
        showUserList: true, // Enable user list to see participants
      });
    };

    initMeeting();
  }, [roomId, user]);

  return <div ref={meetingRef} style={{ width: "100%", height: "100vh" }} />;
};

export default RoomPage;
