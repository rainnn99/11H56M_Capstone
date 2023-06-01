import React, { useEffect, useState } from "react";

const Map = ({ selectedPhoto }) => {
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src = "//dapi.kakao.com/v2/maps/sdk.js?appkey=e07b7eceebfbc8695cb6df262d314685&libraries=services";
    document.head.appendChild(script);

    script.onload = () => {
      const { kakao } = window;

      // 지도가 로드되었을 때
      setMapLoaded(true);

      kakao.maps.load(() => {
        const container = document.getElementById("map");
        const options = {
          center: new kakao.maps.LatLng(37.5598878, 126.977072),
          level: 4
        };
        const map = new kakao.maps.Map(container, options);

        // 갈치조림
        const markerPositions1 = [
          new kakao.maps.LatLng(37.5598878, 126.977072), // 희락갈치
          new kakao.maps.LatLng(37.5597797, 126.977060) // 중앙갈치식당
        ];
        const markers1 = markerPositions1.map(position => (
          new kakao.maps.Marker({ position })
        ));
        markers1.forEach(marker => marker.setMap(map));

        // 감자탕 
        const markerPositions2 = [
          new kakao.maps.LatLng(37.5597166, 126.976925), // 동화식당
          new kakao.maps.LatLng(37.5591763, 126.978521), // 윤영밥상
          new kakao.maps.LatLng(37.5607622, 126.979426), // 생생통영마을
          new kakao.maps.LatLng(37.5589872, 126.979177), // 김명숙아지매순대국
          new kakao.maps.LatLng(37.5577081, 126.980886) // 두원식당
        ];
        const markers2 = markerPositions2.map(position => (
          new kakao.maps.Marker({ position })
        ));
        markers2.forEach(marker => marker.setMap(map));

        // 수제비 
        const markerPositions3 = [
          new kakao.maps.LatLng(37.5597616, 126.976619), // 숭례분식
          new kakao.maps.LatLng(37.5623650, 126.974468) // 종로수제비
        ];
        const markers3 = markerPositions3.map(position => (
          new kakao.maps.Marker({ position })
        ));
        markers3.forEach(marker => marker.setMap(map));

        // 선택된 사진에 해당하는 식당만 표시
        const allMarkers = [...markers1, ...markers2, ...markers3];
        const selectedMarkers = selectedPhoto
          ? allMarkers.filter(marker =>
              (markerPositions1.includes(marker.getPosition()) && selectedPhoto === "갈치 조림") ||
              (markerPositions2.includes(marker.getPosition()) && selectedPhoto === "감자탕") ||
              (markerPositions3.includes(marker.getPosition()) && selectedPhoto === "수제비")
          )
          : allMarkers;

        // 선택한 식당 포인터들을 지도에 표시
        selectedMarkers.forEach(marker => marker.setMap(map));
      });
    };
  }, [selectedPhoto]);

  return (
    <div>
      <div id="map" style={{ width: "760px", height: "720px", marginTop: 100, marginLeft: 100}}></div>
    </div>
  );
};

export default Map;