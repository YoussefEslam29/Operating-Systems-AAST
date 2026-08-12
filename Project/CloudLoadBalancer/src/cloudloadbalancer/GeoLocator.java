package cloudloadbalancer;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

public class GeoLocator {

    // Looks up the approximate city/country for a given IP using ip-api.com (free, no key required)
    public static String lookup(String ip) {
        try {
            URL url = new URL("http://ip-api.com/json/" + ip + "?fields=status,city,country");
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");
            conn.setConnectTimeout(3000);
            conn.setReadTimeout(3000);

            BufferedReader reader = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            StringBuilder response = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                response.append(line);
            }
            reader.close();

            String json = response.toString();
            String city = extractField(json, "city");
            String country = extractField(json, "country");

            if (city == null && country == null) {
                return "Unknown location";
            }
            return city + ", " + country;

        } catch (Exception e) {
            return "Unknown location";
        }
    }

    // Minimal manual JSON field extraction (avoids needing an external JSON library)
    private static String extractField(String json, String field) {
        String key = "\"" + field + "\":\"";
        int start = json.indexOf(key);
        if (start == -1) return null;
        start += key.length();
        int end = json.indexOf("\"", start);
        if (end == -1) return null;
        return json.substring(start, end);
    }
}