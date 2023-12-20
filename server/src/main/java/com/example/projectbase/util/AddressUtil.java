package com.example.projectbase.util;

import com.example.projectbase.domain.dto.AddressDto;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

public class AddressUtil {
    public static String getLocationName(AddressDto addressDto) {
        String url = "https://nominatim.openstreetmap.org/reverse?format=json&lat=" + addressDto.getLatitude() + "&lon=" + addressDto.getLongitude() + "&zoom=18&addressdetails=1";

        HttpURLConnection connection = null;
        try {
            connection = (HttpURLConnection) new URL(url).openConnection();
            connection.setRequestMethod("GET");

            int responseCode = connection.getResponseCode();
            if (responseCode == HttpURLConnection.HTTP_OK) {
                BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
                StringBuilder response = new StringBuilder();
                String line;
                while ((line = reader.readLine()) != null) {
                    response.append(line);
                }
                reader.close();

                String json = response.toString();
                int startIndex = json.indexOf("\"display_name\":\"") + 16;
                int endIndex = json.indexOf("\"", startIndex);
                return json.substring(startIndex, endIndex);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    public static double calculateDistance(AddressDto address1Dto, AddressDto address2Dto) {
        double earthRadius = 6371;

        double latDiff = Math.toRadians(address2Dto.getLatitude() - address1Dto.getLatitude());
        double lonDiff = Math.toRadians(address2Dto.getLongitude() - address1Dto.getLongitude());

        double a = Math.sin(latDiff / 2) * Math.sin(latDiff / 2)
                + Math.cos(Math.toRadians(address1Dto.getLatitude())) * Math.cos(Math.toRadians(address2Dto.getLatitude()))
                * Math.sin(lonDiff / 2) * Math.sin(lonDiff / 2);

        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return earthRadius * c;
    }
}
