# Doğrulama notu — 27 Ekim 2026

JavaScript sözdizimi, kuver türleri, bir mola sınırı, ilk/ikinci deneme puanlaması, öğrenme ve bağımsız deneme ayrımı, 10 benzersiz tanıma sorusu, soru/kart motorları, rapor oluşturma, kaynak sayfası aktarımı, misafir-kayıt ayrımı ve boş içerik durumları kod üzerinden sınandı. Durum akışı testleri başarılıdır.

Çalıştırma: `node tests/state-tests.cjs` (Node.js; ek paket gerektirmez). Testlerdeki yapay soru/kartlar yalnız test belleğinde kullanılır, konu dosyalarına yazılmaz. Bu testler DOM/tarayıcı çizimi yerine hafif bir belge taklidi kullanır.

Kullanıcının fotoğrafı SHA-256 karşılaştırmasıyla birebir doğrulandı. Çevrimdışı önbellekteki tüm dosya yolları kontrol edildi.

Bu ortamda görsel tarayıcı çalıştırılamadı. Bu nedenle piksel yerleşimi, gerçek dokunmatik kullanım, ekran okuyucu davranışı, PDF içeriğinin doğruluğu ve canlı GitHub Pages üzerinde çevrimdışı kurulum doğrulanmış sayılmaz.

Yüklemeden sonra: 390 px telefon görünümü, yatay ekran, akıllı tahta, klavyeyle tüm hedeflere ulaşma, rapor indirme ve çevrimdışı yeniden açma kontrol edilmelidir.

# Doğrulama notu — 28 Ekim 2026 (Mutfak Araçları eşleştirme)

- 132 kart görseli; set listesi, ad sayfaları ve görseller tek tek karşılaştırıldı. 11 takımın her birinde 12 farklı ad var.
- `node tests/state-tests.cjs`: 11 takımın 132 kartı baştan sona oynatıldı. Her soruda 4 farklı seçenek, doğru yanıt ve kitapta karşılaştırılan benzer araçlar seçeneklerde. İpucu ve açıklama ekranda. Rapor satırı ve takım adı doğru. Bütün görsel yolları diskte ve `sw.js` listesinde.
- Ekran (tam paket, kendi `index.html` ve `css/` dosyalarıyla): Chromium'da 390 × 844 telefon, 844 × 390 yatay telefon ve 1920 × 1080 akıllı tahta boyutunda 17 ekran açıldı (açılış, profil, konular, basit ve tabldot kuver, Adını Bul, takım listesi, kart sorusu, rapor, geçmiş, boş konu, mola penceresi). Konsol hatası ve eksik dosya yok. `sw.js` listesindeki bütün dosyalar pakette var.
- Gerçek telefon dokunuşu, ekran okuyucu ve GitHub Pages üzerinde çevrimdışı açılış yüklemeden sonra denenmelidir.
