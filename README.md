# Mesleki Oyunlar — GitHub Pages paketi

Bu paket https://guvec.github.io/Kuver/ adresindeki uygulamanın herkese açık kaynak kodu temel alınarak hazırlandı. Canlı GitHub deposuna değişiklik gönderilmedi. Eski dosyaları saklayarak bu paketin içindekileri yayımlama klasörüne yükleyin.

## Kesinleşen yapı

Ana menüde konular bulunur:

- Kuver
- Mutfak Araçları
- Beslenme İlkeleri
- Bulaşık Makinesi Temizliği

Her konu içinde **Eşleştirme**, **Kelime Kartları**, **Çoktan Seçmeli Sorular** alt kategorileri vardır. Kuver bölümünde ayrıca **Kuveri Kur** ve **Adını Bul** bulunur. İleride başka oyunlar aynı konuya eklenebilir.

## İki kuver türü

**Basit Kuver:** Kuver tabağı, yemek çatalı, yemek bıçağı, çorba kaşığı, su bardağı, peçete (6 parça; öğrenci 5 parçanın yerini seçer).

**Tabldot Kuver:** Basit kuverdeki parçalar + ekmek tabağı, tereyağı bıçağı, tatlı çatalı, tatlı kaşığı (10 parça; öğrenci 9 parçanın yerini seçer). Kullanıcının gönderdiği görsel, değiştirilmeden `assets/kuver/tabldot-kuver-referans.png` dosyasına kondu. Basit kuverin örneği kendi altı parçasından oluşturulur.

Bu iki sabit düzen öğretim örneğidir. Gerçek serviste takım seçimi menüye bağlıdır. Bu uygulamadaki tabldot örneği, kullanıcının gönderdiği görseldeki düzeni izler. Yeni kuver türü ve eski “Seviye 1/2/3” menüsü yoktur.

## Öğretim ve değerlendirme

- **Öğreniyorum:** İlk hatada somut ipucu, ikinci deneme, ardından açıklama. İlk denemede doğru +10; ikinci denemede doğru +5. Açıklaması gösterilen yanıta puan verilmez.
- **Kendimi Deniyorum:** Tek yanıt. Her yerleştirme sorusu yeniden boş alanla başlar; tüm olası hedefler kalır. Son parçanın yerini tek boş hedefe dokunarak bulma sorunu giderilmiştir. Açıklama yanıttan sonra gösterilir.
- Her oturumda **yalnız 1 mola hakkı** vardır. Molada ve onay pencerelerinde soru süresi durur.
- Adını Bul oturumu her parçayı bir kez sorarak 10 soruda tamamlanır.
- Öğrenci ekranında yalnız tamamlanan etkinlik ve puan gösterilir. İlk/ikinci deneme ayrımı raporda tutulur.
- Yer seçmek; aracı tutma, döndürme, hizalama ve gerçek masada mesafe ayarlama becerilerinden ayrı değerlendirilir.
- Profiller ve geçmiş aynı cihaz/tarayıcıda `kv_` anahtarlarıyla saklanır. Eski kayıtlar korunur ve eski düzey adlarıyla işaretlenir. Kayıtlar cihazlar arasında eşitlenmez. Misafir kayıt bırakmaz.

## PDF içerikleri

**Mutfak Araçları · Eşleştirme (28.10.2026):** `Mutfak_Araclari_Eslestirme_Kartlari-2.pdf` aktarıldı.

- 11 takım × 12 kart = 132 kart, 120 farklı araç. Öğrenci önce takımı seçer; her oturum 12 karttır.
- Kart görselleri PDF'den kesildi, yeni görsel üretilmedi: `assets/mutfak-araclari/tTT_KK.jpg` (TT takım, KK PDF'deki kart sırası). Her görsel ad sayfasıyla ve set listesiyle tek tek karşılaştırıldı.
- Oyun okuldaki kâğıt oyunla aynıdır: takımın 12 görseli ve 12 ad kartı birlikte görünür (`js/eslestirme.js`). Öğrenci bir görsele, sonra bir ada dokunur (ya da önce ada, sonra görsele). Eşlenen ad listeden çıkar. Her görselde büyütme düğmesi vardır.
- **Öğreniyorum:** Her eşleşme hemen denetlenir. İlk yanlışta kitabın "Farkı nedir?" cümlesi ipucu olur (yanıtı ele veren 12 ipucu kullanılmadı); ikinci yanlışta doğru ad gösterilir. Doğru eşleşmeden sonra kitabın "Ne için kullanılır?" metni görünür. İlk denemede +10, ikinci denemede +5.
- **Kendimi Deniyorum:** 12 görsel eşlenir; eşleşme kontrol öncesi değiştirilebilir. "Kontrol et" ile toplu bakılır, tek denemedir. Yanlışların altında doğru ad yazar.
- Rapor her görsel için sonucu ayrı yazar.

**Mutfak Araçları · Çoktan Seçmeli Sorular (28.10.2026):** `Mutfak_Araclari_Ogrenci_Kitabi.pdf` kitabından 211 soru aktarıldı: Kendini dene (13 konu, 139 soru), 3 bölüm sonu değerlendirme (30), 3 görselden seçme (21), 3 durum soruları (21). Öğrenci önce konuyu seçer (`js/sorular.js`). Soru metni, A-B-C-D sırası ve doğru harf kitaptaki gibidir; sorular kitap sırasıyla gelir. Fotoğraflı seçenekler ve soru fotoğrafları PDF'den kesildi (`assets/mutfak-araclari/sorular/`); boy karşılaştırması gereken sorularda dört fotoğraf aynı ölçekle kesildi. Doğru yanıttan sonra öğretmen cevap anahtarındaki açıklama gösterilir; öğretmene yönelik üç not cümlesi öğrenci ekranına alınmadı.

Kuver, Beslenme İlkeleri ve Bulaşık PDF'leri henüz aktarılmadı. Bu konuların `icerik.json` dizileri bilerek boştur ve arayüz bunu açıkça söyler.

Dosya yapısı:

| Klasör | İçerik |
| --- | --- |
| `content/kuver/` | Yalnız kuver soruları ve kartları |
| `content/mutfak-araclari/` | Araç eşleştirme ve kelime kartları |
| `content/beslenme-ilkeleri/` | Yalnız beslenme içerikleri |
| `content/bulasik-makinesi-temizligi/` | Yalnız ilgili temizlik içerikleri |
| Her konunun `kaynaklar/` klasörü | Kaynak notu (PDF'ler telif nedeniyle depoda tutulmaz) |
| `js/core.js` | Mevcut oyundan korunan temel işlevler ve görsel rapor |
| `js/platform.js` | Konu menüleri, kuver türleri, ortak kart/soru motorları |
| `index.html` | Sayfa iskeleti; `css/` ve `js/` dosyalarını yükler |
| `css/style.css` | Temel tasarım (renkler, düğmeler, kuver masası, pencereler) |
| `css/platform.css` | Konu/takım listeleri, kart görseli, su bardağı, rapor tablosu, telefon-yatay ve akıllı tahta düzenleri |
| `assets/kuver/` | Kuver parça fotoğrafları, tabldot örnek fotoğrafı, su bardağı görseli |
| `assets/mutfak-araclari/` | Eşleştirme kartı görselleri |

PDF'ler geldiğinde her etkinlik kendi konusuna aktarılır. Soru metni, seçenek sırası, doğru seçenek harfi ve kaynak sayfası korunur. Belirsiz cevap anahtarları tahminle doldurulmaz. Görseller ilgili kartla karşılaştırılır. Aynı sorunun kopyaları kaynakları belirtilerek birleştirilir; farklı beceriyi ölçen sorular ayrı kalır.

### Çoktan seçmeli soru veri biçimi

`questions` dizisinin her elemanı:

- `id`: Konu içinde benzersiz soru kimliği.
- `prompt`: PDF'deki soru metni.
- `choices`: Sıralı `{ "id": "A", "text": "..." }` seçenekleri. Harfler ve sıra karıştırılmaz.
- `correct`: Cevap anahtarındaki seçenek kimliği.
- `explanation`: Kısa Türkçe açıklama.
- `hint`: Gerekiyorsa öğretim ipucu.
- `source`: `{ "file": "kaynak.pdf", "page": 1, "question": "1" }`.

### Kart veri biçimi

`matches` ve `words` dizilerinin her elemanı:

- `id`: Benzersiz kimlik.
- `prompt`: Görsele veya kelimeye ait yönerge.
- `image`: Varsa `assets/...` ile başlayan göreli görsel yolu.
- `imageAlt`: Cevabı ele vermeyen görsel açıklaması.
- `answer`: Eşleştirilecek ad veya kelime.
- `explanation`, `hint`, `source`: Açıklama, ipucu, kaynak.

Eşleştirme ve kelime oyunları için en az iki farklı kart gerekir. Motor, bir kartı gösterip doğru kelimeyi/adı seçtirir. PDF'de farklı bir oyun kuralı varsa aynı konu altına ayrı motor eklenmelidir; PDF görülmeden kuralı tahmin edilmedi.

## Bu tam paket hakkında (28.10.2026)

`index.html`, `css/style.css`, `css/platform.css` ve `manifest.json` yeniden yazıldı. Temel görünüm canlı sitedeki ilk sürümün (Kuverimi Kuruyorum) tasarımından korundu.

Kuver fotoğrafları canlı sitedeki ilk sürümün içinden alındı. `assets/kuver/tabldot-kuver-referans.png` dosyası da o sürümdeki örnek kuver fotoğrafıdır. Öğretmenin daha önce gönderdiği fotoğraf bundan farklıysa, o fotoğraf aynı adla bu dosyanın yerine konur. Su bardağı (`su_bardagi.jpg`) bu fotoğraftaki bardaktan kesildi.

Düzeltme: Bir kuver çalışması bittikten sonra "Adını Bul" açılınca ekranda hemen "Çalışma tamamlandı" görünüyordu. Yeni oturum artık temiz başlıyor.

## GitHub'a yükleme

1. Depodaki mevcut sürümün ZIP yedeğini alın.
2. Bu ZIP'i açın. `oyun-platformu` klasörünün **içindekileri** GitHub Pages'in kullandığı klasöre yükleyin. `index.html`, yayın kökünde kalmalı; yanlışlıkla bir alt klasörde bırakılmamalı.
3. `index.html`, `js`, `css`, `assets`, `content`, `manifest.json`, `sw.js`, `.nojekyll` birlikte yüklenmelidir. Yalnız index.html değiştirmek yeterli değildir.
4. Pages ayarındaki mevcut dal/klasörü koruyun. Bu paket derleme veya sunucu gerektirmez.
5. Sayfayı yeniden açın. Eski çevrimdışı sürüm görünürse yenileyin. Yeni service worker önceki kuver önbelleklerinden kendi kapsamındakileri temizler ve ağ varsa yeni dosyaları alır.
6. Yeni PDF eklediğinizde `sw.js` içindeki CACHE sürümünü değiştirin. Çevrimdışı kullanım için yeni görsel dosyalarını FILES listesine de ekleyin.

Yerel deneme: Proje klasöründe `python -m http.server 8000`; ardından `http://localhost:8000`. JSON yüklemek için dosyaya çift tıklamak yerine HTTP üzerinden açın.

## Sınırlar

Paket GitHub'a yüklenmeye hazır kaynak dosyalarıdır; canlı siteye kurulmadı. PDF içeriği ekleme işi kaynaklar gelince tamamlanabilir. Soru motorları PDF'den otomatik metin/görsel çıkartmaz. Mobil düzen kontrolleri gerçek Android cihaz, akıllı tahta ve ekran okuyucu testlerinin yerini tutmaz.
